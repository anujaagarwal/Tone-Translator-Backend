const OpenAI = require('openai');
const models = require('../models');
const RequestResponses = models.RequestResponses

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to handle the business logic of translating tone
const translateTone = async (sample_content, new_draft) => {
    const prompt = `As an expert English linguistic teacher with deep knowledge of text analysis, your task involves two main steps:
    You will be given two texts one is sample_content and another is new_draft.
    Analyze the sample_content: You will assess the tone and sentiment of the sample_content.
    Translate the Tone of the new_draft: The new_draft, must be translated to the tone identified in the sample_content. 
    Your response should include:
    The tone of the sample_content.
    The sentiment of the sample_content.
    The new_draft should be translated to match the tone of the sample_content.
     Please provide your answer in JSON structure like this 
     {
      "sample_tone": "<The tone of sample_content>",
       "sample_sentiment": "<The sentiment of sample_content>", 
       "translated_text": "<The translated new_draft>"
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
                "sample_content: Recent studies indicate a significant correlation between urban green spaces and improved mental health outcomes among residents., new_draft: Wow, our latest product launch smashed all our targets! Huge thanks to everyone involved!",
    
            },
            {
              role: "assistant",
              content:
                '{"sample_tone": "Academic, Informative", "sample_sentiment": "Positive", "translated_text": "Recent findings from our latest product launch reveal that we have exceeded our expected targets. I would like to extend my gratitude to all team members involved in this success."`}',
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
