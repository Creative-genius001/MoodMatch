import { PlaylistProp } from '@/app/store/store';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { prompt } from './prompt';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are a song playlist genrator called MoodMatch AI. If the prompt does not relate to generating a playlist, do not return an empty schema instead return just the errorMessage schema property with a  message telling the user that you can only help him/her generate a music playlist",
  generationConfig: {
    responseMimeType: "application/json",
  },
});



export const getSongRecommendation = async (mood : string, genre: string) =>{
  const Fprompt: string = prompt + mood + genre
  try {
    const result = await model.generateContent(Fprompt);
    const data = JSON.parse(result.response.text()) as PlaylistProp;
    return(data);
  } catch (error) {
    console.error(error)
    throw new Error("Server is overloaded currently")
  }
  
}