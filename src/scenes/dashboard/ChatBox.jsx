import { MainContainer } from "@minchat/react-chat-ui";
import { current } from "@reduxjs/toolkit";
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const chatGptSendMessage = async (message, setMessage, newMessage) => {
    var messageSendToChatBot = message.map(mes => {
        return {
            "role": mes.user.id === 'mark' ? "assistant" : "user",
            "content": mes.text
        };
    });
    console.log(messageSendToChatBot)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messageSendToChatBot,
    });
    console.log(message)
    let response = completion.data.choices[0].message.content + "\n";
    console.log(response);
    setMessage(message => [...message,
    {
        "user": {
            "id": "mark",
            "name": "Markus",
            avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"

        },
        "text": response
    }])
}

const ChatBox = () => {
    const [showChatBot, setShowChatBot] = useState(false);
    const [message, setMessage] = useState([
        // {
        //     "user": {
        //         "id": "danny_1",
        //         "name": "Daniel Georgetown",

        //     },
        //     "text": "first message"
        // },
        {
            "user": {
                "id": "mark",
                "name": "Markus",
                avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"

            },
            "text": "Hello, I am a AI Chatbot"
        }])

    return (
        <div>
            <div className="chatbot-icon" onClick={() => setShowChatBot(!showChatBot)}>
                <img src="https://cdn.dribbble.com/users/279657/screenshots/2701628/chatbot.png" alt="" />
            </div>
            <div className={`${showChatBot ? "chatbot" : "chatbot hide"}`}>
                <MainContainer
                    inbox={{
                        // onScrollToBottom: () => { },
                        // themeColor: "#6ea9d7",
                        // conversations: [],
                        // loading: false,
                        // onConversationClick: () => console.log("onChat click"),
                        // selectedConversationId: "1"
                    }}
                    selectedConversation={
                        {
                            themeColor: "#6ea9d7",
                            messages: message,
                            header: "Chatbot",
                            currentUserId: "dungnguyen",
                            onSendMessage: async (text) => {
                                console.log("onSendMessage: " + text)
                                const newMessage = {
                                    "user": {
                                        "id": "dungnguyen",
                                        "name": "Daniel Georgetown",

                                    },
                                    "text": text
                                }
                                setMessage(
                                    message => [
                                        ...message,
                                        newMessage,
                                    ]
                                )
                                const currentMessage = [
                                    ...message,
                                    newMessage,
                                ]
                                await chatGptSendMessage(currentMessage, setMessage, newMessage)
                                console.log("End!")
                            },
                            onBack: () => { setShowChatBot(false) },
                            onAttachClick: () => { console.log("Attach File") },
                            sendMessageLoading: true,
                        }
                    }
                    mobileView={true}
                ></MainContainer>
            </div>
        </div >
    );
}
export default ChatBox;
