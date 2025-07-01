import Promt from "../models/promt.model.js";
import OpenAI from "openai"



const openai = new OpenAI({
    baseURL:"https://openrouter.ai/api/v1",
    apiKey:process.env.OPENAI_API_KEY
})


export const sendPrompt = async (req,res)=>{
const {content } = req.body;
const userId = req.userId;

if(!content || content.trim()===""){
    return res.status(400).json({error:"Prompt content is required"})
}

try {
    // saving the promt in database
    const userPromt = await Promt.create({
        userId,
        role:"user",
        content
    })
    // sending content to ai
    const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            "role": "user",
            "content": content
          }
        ]
    });
// saving the response in databse
    const aiContent = completion.choices[0].message.content

    const deepSeekContent = await Promt.create({
        userId,
        role:"assistant",
        content:aiContent
    })

   return res.status(200).json({reply:aiContent})

} catch (error) {
    console.log("Error in promt:", error)
    return res.status(500).json({error:"Something went wrong with the ai"})
}
}
