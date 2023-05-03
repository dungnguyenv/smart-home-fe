import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export const chatGPTRequest = (async ({ request }) => {
    // const { messages } = request.json();
    const chatGPT = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "user", "content": "what is reactjs?" }],
    })
    const chatGPTMessage = chatGPT.data.choices[0].message;
    console.log(chatGPTMessage);
});