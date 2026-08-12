const {GoogleGenAI}=require("@google/genai")
const {z}=require("zod")
// const {zodToJsonSchema}=require("zod-to-json-schema")
const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi(){
    const response=await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:"Hello Gemini! Explain what is genAi"
    })
    console.log(response.text)
}
const interviewReportSchema=z.object({

    matchScore:z.number().describe("A score between 0 and 100 indicatiing how well the candidate's profile match with the job description"),
    technicalQuestions:z.array(z.object({
        question:z.string().describe("The technical question that can be asked in the interview"),
        intention:z.string().describe("The intention of the interviewer behind asking this question"),
        answer:z.string().describe("How to answer the question, what point to conver, what approach to take etc")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions:z.array(z.object({
        question:z.string().describe("The behavioral question that can be asked in the interview"),
        intention:z.string().describe("The intention of the interviewer behind asking this question"),
        answer:z.string().describe("How to answer the question, what point to conver, what approach to take etc")
    })).describe("Behavioral questions that can be asked in the interview along with their intention"),
    skillGap:z.array(z.object({
        skill:z.string().describe("The skill which the candidate is lacking"),
        severity:z.enum(["low","medium","high"]).describe("The description of the skill gap, i.e. how much important the skill is for the required job")
    })).describe("List of skill gap in the candidate's profile along with their severity"),
    preparationPlan:z.array(z.object({
        day:z.number().describe("The day required to fill the skill gap, starting from 1"),
        focus:z.string().describe("The main focus of this day in the preparation pan, e.g. data structures,system design, mock interview"),
        tasks:z.string().describe("List of the taks to be done on this day to follow the preparation plan, e.g. read a specific book or study any specific topic etc.")
    })).describe("A day-wise preparation plan for the cnadidate to follow in order to prepare for the interview effectively")
})
async function generateInterviewReport({resume,selfDescription,jobDescription}){
    const prompt=`Generate an interview report for a candidate with the foloowing details:
                    Resume:${resume}
                    Self Description:${selfDescription}g
                    Job Description:${jobDescription}`
    const response=await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema),
        }
    })
    return JSON.parse(response.text)
}
module.exports={invokeGeminiAi,generateInterviewReport}