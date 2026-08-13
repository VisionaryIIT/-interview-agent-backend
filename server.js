require("dotenv").config()
const app=require("./src/app")
const connectToDB = require("./src/config/database")

const requiredEnvironmentVariables = ["MONGO_URI", "JWT_SECRET", "GOOGLE_GENAI_API_KEY"]
const missingEnvironmentVariables = requiredEnvironmentVariables.filter((name) => !process.env[name])

async function startServer() {
    if (missingEnvironmentVariables.length) {
        throw new Error(`Missing required environment variables: ${missingEnvironmentVariables.join(", ")}`)
    }

    await connectToDB()

    const port = Number(process.env.PORT) || 3000
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

startServer().catch((error) => {
    console.error("Unable to start server:", error.message)
    process.exit(1)
})
