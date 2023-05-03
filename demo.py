import openai
openai.api_key = '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'
# audio_file = open("./public/assets/voices/hello.m4a", "rb")
# transcript = openai.Audio.transcribe("whisper-1", audio_file)
# print(transcript)

message = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        # {"role": "system", "content": "You are a helpful assistant."},
        # {"role": "user", "content": "Who won the world series in 2020?"},
        # {"role": "assistant",
        #     "content": "The Los Angeles Dodgers won the World Series in 2020."},
        # {"role": "user", "content": "Where was it played?"},
        {"role": "user", "content": "React Js là gì?"}
    ]
)

print(message)
