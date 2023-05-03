const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const completion = openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        // { "role": "system", "content": "You are a helpful assistant." },
        // { "role": "user", "content": "Who won the world series in 2020?" },
        // {
        //     "role": "assistant",
        //     "content": "The Los Angeles Dodgers won the World Series in 2020."
        // },
        // { "role": "user", "content": "Where was it played?" },
        { "role": "user", "content": "what is reactjs?" }
    ],
});
console.log(JSON.stringify(completion.data));