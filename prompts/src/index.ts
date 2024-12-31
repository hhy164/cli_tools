import { TextPromptOptions, TextPrompt } from './TextPrompt.js'

const map: Record<string, any> = {
  text: TextPrompt
}

async function runPrompt(question: TextPromptOptions) {
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

export async function prompt(question: TextPromptOptions[]) {
  const answer: Record<string, any> = {};
  for (const item of question) {
    const key = item.name;
    answer[key] = await runPrompt(item)
  }
  return answer
}

const questions: TextPromptOptions[] = [
  {
    message: "你的名字?",
    type: 'text',
    name: 'name'
  }, {
    message: '年龄？',
    type: 'text',
    name: 'age'
  }
]

async function start() {
  const answer = await prompt(questions);
  console.log(answer)
}

start()