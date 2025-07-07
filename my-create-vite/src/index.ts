import minimist from 'minimist'
import chalk from 'chalk'
import prompts from 'prompts'
import { FRAMEWORK, TEMPLATES, IFramework } from './config.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// 默认目录
const defaultDir = 'vite-project'

const args = minimist(process.argv.slice(2), {
  alias: { // 设置别名
    t: 'template',
    h: 'help'
  },
  string: ['_'] // 将_中的内容设置为 string 类型
})

const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${chalk.yellow('vanilla-ts     vanilla')}
${chalk.green('vue-ts         vue')}
${chalk.cyan('react-ts       react')}
${chalk.cyan('react-swc-ts   react-swc')}
${chalk.magenta('preact-ts      preact')}
${chalk.redBright('lit-ts         lit')}
${chalk.red('svelte-ts      svelte')}
${chalk.blue('solid-ts       solid')}
${chalk.blueBright('qwik-ts        qwik')}`

async function init() {
  const argTemplate = args.template || args.t;
  // 项目目录
  const argTargetDir = formatTargetDir(args._[0]);
  let targetDir = argTargetDir || defaultDir;

  let result;

  try {
    result = await prompts(
      [{
        // 如果终端有传入项目目录则忽略此项
        type: argTargetDir ? null : 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: defaultDir, // 设置默认值
        onState: (state) => {
          // 输入值变化时，格式化目录
          targetDir = formatTargetDir(state.value) || defaultDir;
        }
      }, {
        type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
        name: 'Select a framework:',
        message: '- Use arrow-keys. Return to submit',
        initial: 0,
        choices: FRAMEWORK.map((item) => {
          const chalkFn = item.color;
          return {
            title: chalkFn(item.display || item.name),
            value: item
          }
        })
      }, {
        // 这里的type需要以上一个问题的答案作为选项
        type: (prev: IFramework) => {
          return prev && prev.variants ? 'select' : null
        },
        name: "Select a variant:",
        message: 'Use arrow-keys. Return to submit',
        initial: 0,
        choices: (prev: IFramework) => {
          return prev.variants.map((item) => {
            const chalkFn = item.color;
            return {
              title: chalkFn(item.display || item.color),
              value: item
            }
          })
        }
      }])
  } catch (e: any) {
    console.log(e.message)
    return;
  }

  const help = args.help;
  if (help) {
    console.log(helpMessage)
    return;
  }
  const { 'Select a variant:': variant } = result;
  const root = path.join(process.cwd(), targetDir);
  let template: string = variant || argTemplate;
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    `template-${template}`
  )
  const renameFiles: Record<string, any> = {
    _gitignore: '.gitignore',
  }
  function write(file: string, content?: string) {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      // 同步写入数据
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      // 递归拷贝文件
      copy(srcFile, destFile)
    }
  }

  function copy(src: string, dest: string) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      copyDir(src, dest)
    } else {
      fs.copyFileSync(src, dest)
    }
  }
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  const files = fs.readdirSync(templateDir)

  for (const file of files) {
    write(file)
  }

  const cdProjectName = path.relative(process.cwd(), root)
  console.log(`\nDone. Now run:\n`)
  if (root !== process.cwd()) {
    console.log(` cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`)
  }
  console.log(` npm install`)
  console.log(` npm run dev`)
  console.log()
}

function formatTargetDir(targetDir: string | undefined) {
  // 匹配到以/结尾的，进行替换
  return targetDir?.trim().replace(/\/+$/g, '')
}



init().catch(e => {
  console.error(e)
})