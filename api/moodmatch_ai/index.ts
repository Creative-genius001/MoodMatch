import { PlaylistProp } from '@/app/types/type';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { prompt } from './prompt';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are a song playlist generator called MoodMatch AI. If the prompt does not relate to generating a playlist, do not return an empty schema instead return an error with the errorMessage schema property with a  message telling the user that you can only help him/her generate a music playlist",
  generationConfig: {
    responseMimeType: "application/json",
  },
});



export const getSongRecommendation = async (mood : string, genre: string, desc : string, trackNum: number) =>{
  const AIPrompt: string = prompt + mood + genre + desc + trackNum
  try {
    const result = await model.generateContent(AIPrompt);
    const data = JSON.parse(result.response.text()) as PlaylistProp;
    return(data);
  } catch (error) {
    console.error(error)
    throw error
  }
  
}