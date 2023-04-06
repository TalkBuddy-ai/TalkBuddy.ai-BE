import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import "dotenv/config";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openapi = new OpenAIApi(openAIConfig);

export const chatCompletion = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const answer = await openapi.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0, // When temperature is above 0, submitting the same prompt results in different completions each time.
    });

    const text = answer.data?.choices?.[0]?.text;

    res.status(200).json({ text });
  } catch (err: any) {
    res.status(500).json({
      message: err?.message,
    });
  }
};
