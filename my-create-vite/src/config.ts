import chalk from "chalk";

export interface IFramework {
  name: string;
  display: string;
  color: Function;
  variants: IFrameworkVariant[]
}

interface IFrameworkVariant {
  name: string;
  display: string;
  color: Function;
  customCommand?: string
}

export const FRAMEWORK: IFramework[] = [{
  name: 'vue',
  display: 'Vue',
  color: chalk.green,
  variants: [
    {
      name: 'vue-ts',
      display: 'TypeScript',
      color: chalk.blue,
    }, {
      name: 'vue',
      display: 'JavaScript',
      color: chalk.yellow
    }
  ]
}, {
  name: 'react',
  display: 'React',
  color: chalk.cyan,
  variants: [
    {
      name: 'react-ts',
      display: 'TypeScript',
      color: chalk.blue
    }, {
      name: 'react-swc-ts',
      display: 'TypeScript + SWC',
      color: chalk.blue
    },
    {
      name: 'react',
      display: 'JavaScript',
      color: chalk.yellow
    }, {
      name: 'react-swc',
      display: 'JavaScript + SWC',
      color: chalk.yellow
    }
  ]
}]

export const TEMPLATES = FRAMEWORK.map((item) => {
  return item.variants?.map((variant) => {
    return variant.name
  })
}).flat(Infinity)
