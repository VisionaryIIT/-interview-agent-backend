const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dns = require("dns")

dns.setServers([
'1.1.1.1',
'8.8.8.8'])
const app = express()

// Render terminates HTTPS at its proxy. Trust the forwarded protocol so secure
// authentication cookies can be issued to the deployed frontend.
app.set("trust proxy", 1)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://interview-ai-agent-kappa.vercel.app"
    ],
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app
