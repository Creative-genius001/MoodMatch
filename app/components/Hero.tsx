import { Headphones, Github, LockKeyhole } from "lucide-react";
import { Button } from "./ui/button";
import { spotifyAuth } from "@/api/spotify";
import Link from "next/link";

const Hero = () => {

  return (
    <div className="sm:w-[90%] md:w-1/2 mx-auto pt-[170px]">
        <div className="relative flex flex-col items-center z-10 text-center space-y-6 px-6 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-light text-white">
            The Future of Music Discovery
          </h1>
        </div>
        
        <p className="md:text-base lg:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Harness the power of AI to discover your perfect playlist. Connect with Spotify and let our advanced algorithms create personalized music experiences tailored just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button onClick={()=> spotifyAuth()} variant="hero" size="lg" className="text-lg px-8 py-6">
            <Headphones className="w-6 h-6" />
            Connect Spotify
          </Button>
          <Link target="_blank" href="https://github.com/Creative-genius001/MoodMatch">
            <Button variant="neon" size="lg" className="text-lg px-8 py-6">
              <Github className="w-6 h-6" />            
              Star on Github
            </Button>
          </Link>
        </div>

        <span className="flex flex-col md:flex-row justify-center items-center w-[70%] md:w-full"><LockKeyhole className="w-4 h-4 mr-2 text-brightGreen" /> <p className="text-sm text-brightGreen">Securely connected to Spotify. We never store your personal data.</p></span>

    </div>
    </div>
  )
}

export default Hero