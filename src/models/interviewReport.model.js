const mongoose=require('mongoose');
/**
 * 
 * -job description schema:string
 * resume text: string
 * self description :String
 * -> TO be generated(answer)
 * matchScore:Number    
 * Technical questions : 
 *              [{
 *                  question:""
 *                  intention:""
 *                  answer:"" 
 *                  }]
 * Behavioral questions : 
 *              [{
 *                  question:""
 *                  intention:""
 *                  answer:"" 
 *                  }]
 * Skill Gaps : [
 *              skill:"",
 *              severity:{
 *               type: String,
 *               enum:["low","medium","high"]}]
 * preparation plan  : [{
 *               day:Number,
 *               focus:String,
 *               tasks:[String]
 *                  }]
 */
const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        require:[true,"Technical Question is Required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer ois required"]
    }
},
    {
        _id:false
    })
const behavioralQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        require:[true,"Technical Question is Required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer ois required"]
    }
},
    {
        _id:false
    })
const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})

const preparationPlacnSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:{
        type:String,
        required:[true,"Taks is required"]
    }
})
const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        requird:[true,"Job Description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlacnSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

const interviewReportModel=mongoose.model("interviewReport",interviewReportSchema);
module.exports=interviewReportModel;