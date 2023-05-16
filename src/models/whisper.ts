import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

class Whisper {
	public apiKey: string;
	public baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1/audio';
  }

  async transcribe(filepath: any) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filepath));
    formData.append('model', 'whisper-1');

    try {
      const response = await axios.post(`${this.baseUrl}/transcriptions`, formData, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      return response.data.text;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  async translate(filePath: string, modelName: string, targetLanguage: string) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('model', modelName);
    formData.append('target_language', targetLanguage);

    try {
      const response = await axios.post(`${this.baseUrl}/translations`, formData, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      return response.data.text;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
}

export default Whisper;