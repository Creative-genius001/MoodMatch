import { PlaylistProp } from '@/app/store/store';
import { toast } from '@/hooks/use-toast';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { prompt } from './prompt';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const schema = {
//   description: "List of recommended songs",
//   type: SchemaType.ARRAY,
//   items: {
//     type: SchemaType.OBJECT,
//     properties: {
//       song: {
//         type: SchemaType.ARRAY,
//         items: {
//           type: SchemaType.OBJECT,
//           properties: {
//             name: {
//             type: SchemaType.STRING,
//             description: "Name of the song",
//             nullable: false,
//           },
//           artist: {
//             type: SchemaType.STRING,
//             description: "Artist who sang the song",
//             nullable: false,
//           },
//           spotifyId: {
//             type: SchemaType.STRING,
//             description: "spotify id of the song",
//             nullable: false
//           },
//           }
//         }
//       },
      
//       playlistName: {
//         type: SchemaType.STRING,
//         description: "Spotify playlist name",
//         nullable: false
//       },
//       playlistDescription: {
//         type: SchemaType.STRING,
//         description: "spotify playlist description",
//         nullable: false
//       },
//       errorMessage: {
//         type: SchemaType.STRING,
//         description: "error message if the user does not ask for a playlist recommendation",
//         nullable: false
//       }
//     },
//     // required: ["songName"],
//   },
// };

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are a song playlist genrator called MoodMatch AI. If the prompt does not relate to generating a playlist, do not return an empty schema instead return just the errorMessage schema property with a  message telling the user that you can only help him/her generate a music playlist",
  generationConfig: {
    responseMimeType: "application/json",
  },
});



// const prompt = "What is my fav food?"
export const getSongRecommendation = async (mood : string, genre: string) =>{
  const Fprompt: string = prompt + mood + genre
  try {
    const result = await model.generateContent(Fprompt);
    const data = JSON.parse(result.response.text()) as PlaylistProp;
    return(data);
  } catch (error) {
    toast({ description: 'Server is currently overloaded'})
    console.error(error)
  }
  
}