const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dns = require("dns")

dns.setServers([
'1.1.1.1',
'8.8.8.8'])
const app = express()

const defaultAllowedOrigins = [
    "http://localhost:5173",
    "https://interview-ai-agent-kappa.vercel.app",
    "https://careerpilotai-alpha.vercel.app",
]

// Set FRONTEND_URLS on Render to add or replace frontend origins, separated by
// commas. Keeping localhost here lets you test the deployed API locally.
const allowedOrigins = process.env.FRONTEND_URLS
    ? process.env.FRONTEND_URLS.split(",").map((origin) => origin.trim()).filter(Boolean)
    : defaultAllowedOrigins

// Render terminates HTTPS at its proxy. Trust the forwarded protocol so secure
// authentication cookies can be issued to the deployed frontend.
app.set("trust proxy", 1)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin(origin, callback) {
        // Requests without an Origin header are non-browser requests (for
        // example health checks) and do not need CORS validation.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error("Origin is not allowed by CORS"))
    },
    credentials: true
}))

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "The resume PDF must be 3 MB or smaller." })
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ message: "The resume must be a PDF file." })
    }

    if (err.name === "SyntaxError" && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON request body." })
    }

    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid resource ID." })
    }

    if (err.code === 11000) {
        return res.status(409).json({ message: "An account with that username or email already exists." })
    }

    console.error(err)
    res.status(500).json({ message: "An unexpected server error occurred." })
})


module.exports = app
