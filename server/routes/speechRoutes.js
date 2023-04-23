import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Yakza!' });
});

router.route('/').post(async (req, res) => {
    const synthesisUrl = 'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech';

    const synthesizeAudio = async (text) => {
        try {
            const response = await fetch(synthesisUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`
                },
                body: JSON.stringify({
                    "inputs": text
                })
            });
    
            const responseData = await response.json();
            console.log('Response data:', responseData);
            const { audio_content } = responseData;
    
            res.send(audio_content);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error synthesizing audio.' });
        }
    };
    
    const { text } = req.body;
    if (text) {
        console.log('Synthesizing audio for text:', text);
        synthesizeAudio(text);
    } else {
        res.status(400).send({ error: 'Missing text parameter.' });
    }
});
    

export default router;
