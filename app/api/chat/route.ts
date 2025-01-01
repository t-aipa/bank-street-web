import { OpenAI } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
 
export async function POST(req: Request) {
  const { messages } = await req.json()
 
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are Bank Stella, an AI assistant specializing in financial advice and banking services. Be helpful, clear, and always prioritize the user\'s financial well-being.',
      },
      ...messages,
    ],
  })
 
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
