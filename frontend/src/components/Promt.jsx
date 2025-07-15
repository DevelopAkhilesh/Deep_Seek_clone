import React, { use, useEffect, useRef } from 'react'
import { useState } from 'react'
import { ArrowUp, Bot, Globe, Paperclip } from 'lucide-react'
import logo_icon from "../assets/vite.config.png"
import axios from 'axios'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

const Promt = () => {
    const [inputValue, setInputValue] = useState("");
    const [typeMessage, setTypeMessage] = useState("");
    const [loading,setLoading]=useState(false);
    

    const promptEndRef = useRef();
    console.log(prompt)


    const getUserId=()=>{
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            return user?._id||"guested_user";
        } catch (error) {
            console.error("Error parsing user from localStorage for ID:", error);
            return 'guest_user_id';
            
        }

    }
    const [promt,setPromt]=useState(()=>{
        const userId = getUserId();
        if (!userId || userId === 'guest_user_id') {
            return [];}
            try {
                const storedChat = localStorage.getItem(`PromtHistory_${userId}`);
            return storedChat ? JSON.parse(storedChat) : [];
            } catch (error) {
                console.error("Error loading chat history from localStorage:", error);
                return [];
            }
    });




    useEffect(()=>{
        const userId=getUserId();
        localStorage.setItem(`PromtHistory_${userId}`,JSON.stringify(promt));
    },[promt])

//    useEffect(()=>{
//         const userId = getUserId();
//         const storedItems =localStorage.getItem(`PromtHistory_${user._id}`);
//         if(storedItems){
//             setPromt(JSON.parse(storedItems));
//         }
    
//     },[]);


//     useEffect(()=>{
//         const user = JSON.parse(localStorage.getItem("user"))
//          localStorage.setItem(`PromptHistory_${user._id}`,JSON.stringify(promt));
//     },[promt]);


    useEffect(()=>{
        promptEndRef.current?.scrollIntoView({behavior:"smooth"})
    },[prompt,loading])

    const handleSend =async()=>{
        const trimValue = inputValue.trim()
        if(!trimValue){
            return 
        }
        setTypeMessage(trimValue);
        setInputValue('')
        setLoading(true);
        try {
            const token = localStorage.getItem('token')
           const {data}= await axios.post('https://deep-seek-clone-t27x.onrender.com/api/v1/deepseekai/promt',{
                content:trimValue,},
                {headers:{
                    Authorization:`Bearer ${token}`
                },
                withCredentials:true
            })
            console.log (data);
            

            setPromt((prev)=>[
                ...prev,
                {role:"user",content:trimValue},
                {role:"assistant",content:data.reply}
            ])
            
        } catch (error) {
            setPromt((prev)=>[
                ...prev,
                {role:"user",content:trimValue},
                {role:"assistant",content:"Something went wrong"}
            ])
            
        }
        finally{
            setLoading(false);
            setTypeMessage(null);
            
        }

    }
    const handleKeyDown=(e)=>{
        if(e.key==="Enter"){
            handleSend();
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
        {promt.map((msg,index)=>(
            <div key={index}className={`w-full flex ${msg.role==="user"?"justify-end":"justify-start"}`}>
                {msg.role==="assistant"?
             (<div className="w-full bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={codeTheme}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg mt-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 px-1 py-0.5 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>)
              :(<div className="w-[30%] bg-blue-600 text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap self-start">
                {msg.content}
              </div>)}
            </div>
        ))}
        {loading&&typeMessage&&(
            <div  className="whitespace-pre-wrap px-4 py-3 rounded-2xl text-sm break-words
            bg-blue-600 text-white self-end ml-auto max-w-[40%]" >{typeMessage}</div>
        )}

        {loading&&(
            <div className='flex justify-start w-full'>
            <div className='bg-[#232323] text-white px-4 py-3 rounded-xl text-sm animate-pulse'> 🤖Loading...</div>
        </div>
        )}
        <div ref={promptEndRef}/>

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
