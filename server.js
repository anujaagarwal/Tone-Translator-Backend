require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3000;

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.use(express.json())

app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.post('/translate-tone', async (req, res) => {
    const { sample_content, new_draft } = req.body;
    if (!sample_content || !new_draft) {
      return res.status(400).json({ error: 'Both sample content and new draft are required' });
    }
  
    // Construct the prompt
    // const prompt = `Hey GPT imagine you are an expert Tone and Sentiment Translator, you have been provided with two texts one is Sample Content : "${sample_content}" and another is new_draft: "${new_draft}". What you have to do is Analyze the tone, writing style and sentiment of sample content and translate the new draft tone to analyzed tone, sentiment and writing style of sample content and in output give me only translated new draft nothing else`;
  
    

  try {
    const chatCompletion = await openaiClient.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content:
            `You are expert english linguistic teacher that has profound knowledge of analyzing written english text tone and sentiment and translate the tone of a given second text to the one analyzed.
            You will be provided with two texts consecutively first one will be the text whose tone and sentiment needs to be analyzed, second text is the text which should be translated to the tone of first one
             Respond with tone, sentiment of first text and translated second text. 
             Provide your answer in JSON structure like this 
             {"sample_tone": "<The tone of first text>", "sample_sentiment": "<The sentiment of first text>", "translated_text": "<The translated second text>"`
        },
        {
          role: "user",
          content:
            "The company has witnessed a significant uptick in revenues this quarter, with a 12% increase compared to the previous quarter. The growth can be attributed to the successful implementation of new marketing strategies that resonated well with our target demographic. It is imperative that we continue to monitor these trends closely to ensure sustained growth and address any unforeseen market fluctuations promptly., Hey everyone, just wanted to let you know that our earnings are looking better than ever! We're up by 12% because those new marketing plans are hitting just right. Let’s keep an eye on this to keep the ball rolling and handle any bumps that come up.",

        },
        {
          role: "assistant",
          content:
            '{"sample_tone": ["Formal", "Professional"], "sample_sentiment": "Positive", "translated_text": "Dear Team, I am pleased to report that our company has experienced a robust increase in revenue this quarter, showing a 12% growth compared to the previous period. This success is primarily due to the effective execution of our new marketing strategies, which have notably aligned with the preferences of our target audience. It is crucial that we continue to rigorously monitor these developments to ensure consistent growth and to adeptly manage any market challenges that may arise. Best Regards [Your Name]"`}',
        },
        {
          role: "user",
          content: `'${sample_content}, ${new_draft}`,
        },
      ],
        // messages: [{ role: 'user', content: prompt }],
        temperature:1,
        model: 'gpt-4-turbo',
        response_format: { type: "json_object" },
    });

    const completion = chatCompletion.choices[0].message.content;
    // First parse - converts jsonString into a JavaScript object
    const parsedObject = JSON.parse(completion)
    // const innerObject = JSON.parse(parsedObject.completion);

    console.log("completion", parsedObject)

    // Send the completion text back to the client
    res.json({ completion });
} catch (error) {
    console.error(error);

    // Send a 500 Internal Server Error response to the client
    res.status(500).send('Internal Server Error');
}
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});