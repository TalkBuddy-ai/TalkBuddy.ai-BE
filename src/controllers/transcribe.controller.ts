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
  let filePath = "";
  if (!file) {
    res.status(404).send('No files were uploaded');
  }
  try {
    const { name, data } = file;
    const cwd = process.cwd();
    filePath = path.join(cwd, 'static', 'uploads', name);
    await fs.writeFile(filePath, data);
  } catch(err) {
    return res.status(500).send({message: 'issue while writing the file', error: err});
  }


  // Transcribe audio
  console.log("Transcibing", filePath)
  if (whisper) {
    whisper.transcribe(filePath)
      .then(text => {
        res.status(200).json({ text });
      }).then(() => {
        // delete the file from server
        fs.unlink(filePath).then(() => {
          console.log("Delete File successfully.");
        }).catch(err => {
          throw err;
        })
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  }
}
