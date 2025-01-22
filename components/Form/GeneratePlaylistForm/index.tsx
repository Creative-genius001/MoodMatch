'use client'

import { getSongRecommendation } from "@/api/AI";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const GeneratePlaylistForm = () => {


    const form = useForm();
    function BtnClicked (e){
        e.preventDefault()
        getSongRecommendation()
    }

  return (
    <div className='w-full'>
        <Form {...form}>
            <form className=''>
                <FormField
                    control={form.control}
                    name="..."
                    render={() => (
                    <FormItem>
                        <FormLabel className='text-md'>What kind of vibe do you want to go for?</FormLabel>
                        <FormControl>
                            <Textarea className="resize-none w-full h-[120px] py-3 text-lg" placeholder='' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                    )}
                />
                  <FormField
                    control={form.control}
                    name="..."
                    render={() => (
                    <FormItem className='mt-6'>
                        <FormLabel className='text-md '>What kind of genre are you insterested in listening to?</FormLabel>
                        <FormControl>
                            <Textarea className="resize-none w-full h-[80px] py-3 text-lg" placeholder='' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name='genre'
                    render={({field}) => (
                    <FormItem className='mt-4'>
                        <FormLabel className='text-md'>Select your preferred genre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl className="py-6">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    
                    )}
                /> */}
            <Button onClick={(e)=> BtnClicked(e)} size='lg' className='w-full mt-4 py-6' type="submit">Find my playlist</Button>
            </form>    
            </Form>
    </div>
  )
}

export default GeneratePlaylistForm