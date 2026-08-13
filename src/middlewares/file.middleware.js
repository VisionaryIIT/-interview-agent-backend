const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    },
    fileFilter(req, file, callback) {
        if (file.mimetype !== "application/pdf") {
            return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "resume"))
        }

        callback(null, true)
    }
})


module.exports = upload
