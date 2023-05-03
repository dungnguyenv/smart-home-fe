import openai
openai.api_key = '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'
audio_file= open("./public/assets/voices/hello.m4a", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)
print(transcript)