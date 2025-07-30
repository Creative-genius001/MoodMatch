import { Play, Headphones } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="w-1/2 mx-auto pt-[170px]">
        <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl">
        <div className="space-y-4">
          <h1 className="lg:text-5xl md:text-4xl font-light text-white">
            The Future of Music Discovery
          </h1>
        </div>
        
        <p className="lg:text-lg md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          Harness the power of AI to discover your perfect playlist. Connect with Spotify and let our advanced algorithms create personalized music experiences tailored just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button size="lg" className="text-lg px-8 py-6 bg-brightGreen">
            <Play className="w-6 h-6" />
            Start Generating
          </Button>
          <Button size="lg" className="text-lg px-8 py-6">
            <Headphones className="w-6 h-6" />
            Connect Spotify
          </Button>
        </div>

    </div>
    </div>
  )
}

export default Hero