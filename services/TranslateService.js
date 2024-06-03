const OpenAI = require('openai');
const models = require('../models');
const RequestResponses = models.RequestResponses

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to handle the business logic of translating tone
const translateTone = async (sample_content, new_draft) => {
    const prompt = `As an expert English linguistic teacher with deep knowledge of text analysis, your task involves two main steps:
    Analyze the sample_content: You will assess the tone and sentiment of the first text, known as the sample_content.
    Translate the Tone of the new_draft: The second text, new_draft, must be adjusted to reflect the tone identified in the sample_content.
    Your response should include:
    The tone of the sample_content.
    The sentiment of the sample_content.
    The new_draft text adjusted to match the tone of the sample_content.
     Please provide your answer in JSON structure like this 
     {
      "sample_tone": "<The tone of first text>",
       "sample_sentiment": "<The sentiment of first text>", 
       "translated_text": "<The translated second text>"
      }`;

    const chatCompletion = await openaiClient.chat.completions.create({
        messages: [
            {
              role: "assistant",
              content: prompt
                
            },
            {
              role: "user",
              content:
                "sample_content: The company has witnessed a significant uptick in revenues this quarter, with a 12% increase compared to the previous quarter. The growth can be attributed to the successful implementation of new marketing strategies that resonated well with our target demographic. It is imperative that we continue to monitor these trends closely to ensure sustained growth and address any unforeseen market fluctuations promptly., new_draft: Hey everyone, just wanted to let you know that our earnings are looking better than ever! We're up by 12% because those new marketing plans are hitting just right. Let’s keep an eye on this to keep the ball rolling and handle any bumps that come up.",
    
            },
            {
              role: "assistant",
              content:
                '{"sample_tone": "Formal, Professional", "sample_sentiment": "Positive", "translated_text": "Dear Team, I am pleased to report that our company has experienced a robust increase in revenue this quarter, showing a 12% growth compared to the previous period. This success is primarily due to the effective execution of our new marketing strategies, which have notably aligned with the preferences of our target audience. It is crucial that we continue to rigorously monitor these developments to ensure consistent growth and to adeptly manage any market challenges that may arise. Best Regards [Your Name]"`}',
            },
            {
              role: "user",
              content: `sample_content: ${sample_content}, new_draft: ${new_draft}`,
            },
          ],
        temperature: 1,
        model: 'gpt-4-turbo',
        response_format: { type: "json_object" },
    });

    const completion = chatCompletion.choices[0].message.content;
    return JSON.parse(completion);
};

// Function to save the translation results to the database
const saveTranslationResult = async (data) => {
    const { sampleContent, newDraft, translatedDraft, sampleTone, sampleSentiment } = data;
    return await RequestResponses.create({
        sampleContent,
        newDraft,
        translatedDraft,
        sampleTone,
        sampleSentiment
    });
};

module.exports = {
    translateTone,
    saveTranslationResult
};
