import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Yakza!' });
});

router.route('/').post(async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.HUGGING_FACE_API_KEY,
    },
    body: JSON.stringify({
      inputs: prompt,
    }),
  });

  if (!response.ok) {
    res.status(500).json({ error: 'Failed to generate image.' });
    return;
  }

  const buffer = await response.arrayBuffer();
  res.setHeader('Content-Disposition', 'attachment; filename="image.jpeg"');
  res.type('jpeg').send(Buffer.from(buffer));
});

export default router;
