type validateArg = {
    prompt: string,
    genre: string,
    mood: string,
    trackNum: string
}

export function Validate(arg: validateArg): boolean {
    
    const {prompt, genre, mood, trackNum} = arg
    if (prompt == "" || genre == "" || mood == "" || trackNum == "") {
        console.error("No filed should be empty!")
        return false
    }
    if (parseFloat(trackNum) > 30 ) {
        console.error("Number should not be more than 30")
        return false
    }

    return true;
}