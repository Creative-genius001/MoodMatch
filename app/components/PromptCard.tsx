import React from 'react'

const PromptCard = (props :{prompt : string}) => {
  return (
    <div className="w-[300px] h-[180px] py-6 px-5 min-h-10 rounded-2xl bg-[#ffffff28] "> 
        <p className='text-muted font-normal text-sm'>{props.prompt}</p>
    </div>
  )
}

export default PromptCard