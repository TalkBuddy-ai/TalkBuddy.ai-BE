import path from "path";
import { NextFunction,Response, Request } from 'express';
import Whisper from "../models/whisper";

export const transcribe = async (req: Request, res: Response, next: NextFunction) => {
  const whisper = process.env.OPENAI_API_KEY && new Whisper(process.env.OPENAI_API_KEY);
  const filePath = path.join(__dirname, "record1.mp3")
  // Transcribe audio
  if (whisper) {
    whisper.transcribe(filePath, 'whisper-1')
    .then(text => {
      res.status(200).json({text});
      console.log(text);
    })
    .catch(error => {
      res.status(500).json({error});
    });
  }
}
