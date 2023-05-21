// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: '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',
// });
// const openai = new OpenAIApi(configuration);

// // const completion = openai.createChatCompletion({
// //     model: "gpt-3.5-turbo",
// //     messages: [
// //         // { "role": "system", "content": "You are a helpful assistant." },
// //         // { "role": "user", "content": "Who won the world series in 2020?" },
// //         // {
// //         //     "role": "assistant",
// //         //     "content": "The Los Angeles Dodgers won the World Series in 2020."
// //         // },
// //         // { "role": "user", "content": "Where was it played?" },
// //         { "role": "user", "content": "what is reactjs?" }
// //     ],
// // });

// const chatGptSendMessage = async () => {
//     const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [
//             { "role": "user", "content": "Hồ Chí Minh là ai?" }
//         ],
//     });

//     console.log(JSON.stringify(completion.data.choices[0].message.content));

// }

// chatGptSendMessage()
// console.log("End!")


const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const openaiApiKey = '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';
const audioFilePath = './public/assets/voices/hello.m4a';
const engine = 'davinci';

async function transcribeAudio() {
    const audioFile = fs.readFileSync(audioFilePath);
    const formData = new FormData();
    formData.append('files', audioFile);

    const config = {
        headers: {
            Authorization: `Bearer ${openaiApiKey}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    const response = await axios.post(`https://api.openai.com/v1/engines/${engine}/audio`, formData, config);
    // console.log(response.data.text);
    // console.log("DATA:" + formData)
}

transcribeAudio();