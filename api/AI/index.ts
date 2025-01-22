import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const schema = {
  description: "List of recommended songs",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      songName: {
        type: SchemaType.STRING,
        description: "Name of the song",
        nullable: false,
      },
      songArtist: {
        type: SchemaType.STRING,
        description: "Artist who sang the song",
        nullable: false,
      },
      songSpotifyId: {
        type: SchemaType.STRING,
        description: "spotify id of the song",
        nullable: false
      },
      playlistName: {
        type: SchemaType.STRING,
        description: "Spotify playlist name",
        nullable: false
      },
      playlistDescription: {
        type: SchemaType.STRING,
        description: "spotify playlist description",
        nullable: false
      },
      errorMessage: {
        type: SchemaType.STRING,
        description: "error message if the user does not ask for a playlist recommendation",
        nullable: false
      }
    },
    // required: ["songName"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are a song playlist genrator called MoodMatch AI. If the prompt does not relate to generating a playlist, do not return an empty schema instead return just the errorMessage schema property with a  message telling the user that you can only help him/her generate a music playlist",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

//const prompt : string = "List out 20 songs to for someone looking for a romance jazz playlist recommendation. Also add a playlist name and description "
const prompt = "What is my fav food?"
export const getSongRecommendation = async () =>{
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  //return(result.response.text());
}