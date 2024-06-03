const translateService = require('../services/TranslateService');

const translateTone = async (req, res) => {
    const { sample_content, new_draft } = req.body;
    if (!sample_content || !new_draft) {
        return res.status(400).json({ error: 'Both sample content and new draft are required' });
    }

    try {
        const parsedObject = await translateService.translateTone(sample_content, new_draft);
        
        

        res.json({ completion: parsedObject });
        // Storing in the database
        const savedRecord = await translateService.saveTranslationResult({
            sampleContent: sample_content,
            newDraft: new_draft,
            translatedDraft: parsedObject.translated_text,
            sampleTone: parsedObject.sample_tone,
            sampleSentiment: parsedObject.sample_sentiment
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    translateTone
};
