import minimist from 'minimist'
import chalk from 'chalk'

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
  const argTargetDir = formatTargetDir(args._[0]);
  const argTemplate = args.template || args.t;

  const help = args.help;
  if (help) {
    console.log(helpMessage)
    return;
  }

  let targetDir = argTargetDir || defaultDir;
}

function formatTargetDir(targetDir: string | undefined) {
  // 匹配到以/结尾的，进行替换
  return targetDir?.trim().replace(/\/+$/g, '')
}

init().catch(e => {
  console.error(e)
})