const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dns = require("dns")

dns.setServers([
'1.1.1.1',
'8.8.8.8'])
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173",
    "https://interview-ai-agent-ba09yf07e-visionaryiits-projects.vercel.app"],
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app