'use client'

import { useStore } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
   import { z } from "zod"
   import { zodResolver } from "@hookform/resolvers/zod"

const GeneratePlaylistForm = () => {

    const { getUserRecommendation, loading } = useStore()

    const formSchema = z.object({
        playlistDescription: z.string({required_error: "This field is required"}),
        genre: z.string({required_error: "This field is required"})
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            playlistDescription: '',
            genre: ''
        }
    });
    
    async function onSubmit (values: z.infer<typeof formSchema>){
        getUserRecommendation(values.playlistDescription, values.genre);
    }

  return (
    <div className='w-full'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='playlistDescription'
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-md'>What kind of vibe do you want to go for?</FormLabel>
                        <FormControl>
                            <Textarea className="resize-none w-full h-[120px] py-3 text-lg" placeholder='I feel so estatic and I wanna go to the beach. I want a happy beach vibes kind of playlist' {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                    )}
                />
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                    <FormItem className='mt-6'>
                        <FormLabel className='text-md '>What kind of genre are you insterested in listening to?</FormLabel>
                        <FormControl>
                            <Textarea className="resize-none w-full h-[80px] py-3 text-lg" placeholder='I want a mix of jazz and hiphop' {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                    )}
                />
                {loading ? <Button size='lg' className='w-full mt-4 py-6' disabled><div className='loader'></div> </Button> : <Button size='lg' className='w-full mt-4 py-6' type="submit">Find my playlist</Button>}        
            </form>    
            </Form>
    </div>
  )
}

export default GeneratePlaylistForm

