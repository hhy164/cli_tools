import minimist from 'minimist';

const argv = minimist(process.argv.slice(2), {
  boolean: ['x'],
  string: ['y'],
  unknown(args) {
    return args === '-u'
  },
  default: { y: 234 },
  alias: { p: 'port', t: 'template' }
});

console.log(argv)

