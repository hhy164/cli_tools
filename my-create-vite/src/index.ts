import minimist from 'minimist'

const args = minimist(process.argv.slice(2), {
  alias: { // 设置别名
    t: 'template',
    h: 'help'
  },
  string: ['_'] // 将_中的内容设置为 string 类型
})
console.log(args)