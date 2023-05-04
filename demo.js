const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// const completion = openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//         // { "role": "system", "content": "You are a helpful assistant." },
//         // { "role": "user", "content": "Who won the world series in 2020?" },
//         // {
//         //     "role": "assistant",
//         //     "content": "The Los Angeles Dodgers won the World Series in 2020."
//         // },
//         // { "role": "user", "content": "Where was it played?" },
//         { "role": "user", "content": "what is reactjs?" }
//     ],
// });

const chatGptSendMessage = async () => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "user", "content": "Hồ Chí Minh là ai?" }
        ],
    });

    console.log(JSON.stringify(completion.data.choices[0].message.content));

}

chatGptSendMessage()
console.log("End!")