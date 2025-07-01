import React from 'react'
import { useState } from 'react'
import { ArrowUp, Bot, Globe, Paperclip } from 'lucide-react'
import logo_icon from "../assets/vite.config.png"
const Promt = () => {
    const [inputValue, setInputValue] = useState("");
    const [typeMessage, setTypeMessage] = useState("");

    const handleSend =()=>{
        const trimValue = inputValue.trim()
        if(!trimValue){
            return 
        }
        setTypeMessage(trimValue);
        setInputValue('')
    }
    const handleKeyDown=(e)=>{
        if(e.key==="Enter"){
            handleSend()
        }
    }

  return (
    <div className="flex flex-col items-center justify-between flex-1 w-full px-4 pb-4 md:pb-8">

      {/* ➤ Greeting Section */}
      <div className="mt-8 md:mt-16 text-center">
        <div className="flex items-center justify-center gap-2">
            <img src={logo_icon} alt="" className="h-6 md:h-8"/>
            <h1 className="text-2xl md:text-3xl font-medium text-white mb-2">
                Hi I'm DeepSeek</h1>
        </div>
        <p className="text-gray-400 text-base md:text-sm mt-2">
            How can i help you today
            </p>
      </div>

       {/* promt Box */}
       <div className='w-full max-w-4xl flex-1 overflow-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1'>
        {typeMessage &&(
            <div className="whitespace-pre-wrap px-4 py-3 rounded-2xl text-sm break-words
            bg-blue-600 text-white self-end ml-auto max-w-[40%]"
           >
                <div>{typeMessage}</div>
            </div>
        )}

       </div>

       {/* {input box} */}
       <div className="w-full max-w-4xl relative mt-auto">
        <div className="bg-[#2f2f2f] rounded-[2rem] px-4 md:px-6 py-6 md:py-8 shadow-md">
            <input type="text"
             placeholder='Message DeepSeek'
             value={inputValue}
             onKeyDown={handleKeyDown}
             onChange={(e)=>setInputValue(e.target.value)}
             className="bg-transparent w-full text-white placeholder-gray-400 text-base md:text-lg outline-none"/>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
                <div className="flex gap-2 flex-wrap">
                    <button className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                    <Bot className="w-4 h-4"/>Deep Think (R1)
                    </button>
                    <button className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                        <Globe className="w-4 h-4" />Search
                        </button>
                </div>


                <div className="flex items-center gap-2 ml-auto">
                    <button className="text-gray-400 hover:text-white transition">
                        <Paperclip className="w-5 h-5"/>
                        </button>
                    <button onClick={handleSend} 
                     className="bg-gray-500 hover:bg-blue-600 p-2 rounded-full text-white transition">
                        <ArrowUp className="w-4 h-4"/>
                        </button>
                </div>
            </div>
        </div>
       </div>
    </div>
  );
}

export default Promt
