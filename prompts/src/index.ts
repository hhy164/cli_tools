import { TextPromptOptions, TextPrompt } from './TextPrompt.js'
import { SelectPrompt, SelectPromptOptions } from './SelectPrompt.js';

export type PromptOptions = TextPromptOptions | SelectPromptOptions;

const map: Record<string, any> = {
  text: TextPrompt,
  select: SelectPrompt
}

async function runPrompt(question: PromptOptions) {
  const promptClass = map[question.type];
  if (!promptClass) return null;
  return new Promise((resolve) => {
    const prompt = new promptClass(question)
    prompt.render()
    // 监听提交
    prompt.on('submit', (answer: string) => {
      resolve(answer)
    })
  })
}

export async function prompt(question: PromptOptions[]) {
  const answer: Record<string, any> = {};
  for (const item of question) {
    const key = item.name;
    answer[key] = await runPrompt(item)
  }
  return answer
}

const questions: PromptOptions[] = [
  {
    message: "你的名字?",
    type: 'text',
    name: 'name'
  }, {
    message: '年龄？',
    type: 'text',
    name: 'age'
  }, {
    message: '你的班级',
    type: 'select',
    name: "class",
    choices: [
      '一班',
      '二班',
      '三班'
    ]
  }
]

async function start() {
  const answer = await prompt(questions);
  console.log(answer)
}

start()