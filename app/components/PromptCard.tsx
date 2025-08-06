
const PromptCard = (props :{prompt : string}) => {
  return (
    <div className="w-full md:w-[300px] md:h-[180px] py-4 md:py-6 px-3 md:px-5 min-h-10 rounded-2xl bg-[#ffffff28] "> 
        <p className='text-muted font-normal text-sm'>{props.prompt}</p>
    </div>
  )
}

export default PromptCard