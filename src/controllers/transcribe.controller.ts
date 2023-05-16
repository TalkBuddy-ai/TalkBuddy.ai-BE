import path from "path";
import { promises as fs } from "fs";
import { NextFunction,Response, Request } from 'express';
import Whisper from "../models/whisper";

export const transcribe = async (req: Request, res: Response, next: NextFunction) => {
  const whisper = process.env.OPENAI_API_KEY && new Whisper(process.env.OPENAI_API_KEY);
  if (!req.files) {
    res.status(404).send('No files were uploaded');
  }
  let file: any = req.files?.file;
  if (!file) {
    res.status(404).send('No files were uploaded');
  }
  const { name, data } = file;
  const cwd = process.cwd();
  const filePath = path.join(cwd, 'static', 'uploads', name);
  await fs.writeFile(filePath, data);

  // Transcribe audio
  if (whisper) {
    whisper.transcribe(filePath)
    .then(text => {
      res.status(200).json({text});
      console.log(text);
    })
    .catch(error => {
      res.status(500).json({error});
    });
  }
}
