import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY // This is also the default, can be omitted
});


// router.route('/').get((req, res) => {
//   res.status(200).json({ message: 'Hello from DALL-E!' });
// });

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello from DALL-E!' });
})

const imagegenaration = async (req, res) => {
    try {
      const { prompt } = req.body;
      console.log("Received prompt:", prompt);
  
      const aiResponsePromise = openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        // response_format: 'b64_json',
      });

      const aiResponse= await aiResponsePromise;

      console.log(aiResponse)
  
      const imageUrl = aiResponse.data[0].url
  
      res.status(200).json({ photo: imageUrl });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error?.response?.data?.error?.message || 'Something went wrong' });

    }
  };
  

router.post('/',imagegenaration)
    
    
export default router;