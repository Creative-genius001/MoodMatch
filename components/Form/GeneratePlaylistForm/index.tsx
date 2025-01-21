'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const GeneratePlaylistForm = () => {

    const form = useForm();

  return (
    <div className='w-full'>
        <Form {...form}>
            <form className=''>
                <FormField
                    control={form.control}
                    name="..."
                    render={() => (
                    <FormItem>
                        <FormLabel className='text-md'>Tell me about how you feel</FormLabel>
                        <FormControl>
                            <Textarea className="resize-none w-full h-[120px] py-3 text-lg" placeholder='' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                    )}
                />
                <FormField
                    control={form.control}
                    name='genre'
                    render={({field}) => (
                    <FormItem className='mt-4'>
                        <FormLabel className='text-md'>Select your preferred genre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
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
                />
            <Button size='lg' className='w-full mt-4 py-6' type="submit">Submit</Button>
            </form>    
            </Form>
    </div>
  )
}

export default GeneratePlaylistForm