const multer = require('multer');
const path = require('path');
const fs = require('fs');

const NOTES_DIR = path.join(__dirname, '../uploads/notes');
if (!fs.existsSync(NOTES_DIR)) {
    fs.mkdirSync(NOTES_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, NOTES_DIR);
    },
    filename(req, file, cb) {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
        cb(null, `${unique}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedExt = /jpeg|jpg|png|gif|webp|pdf/;
    const allowedMime = /image\/(jpeg|jpg|png|gif|webp)|application\/pdf/;
    const ext = allowedExt.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedMime.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only images and PDF files are allowed'));
};

const uploadNote = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB

module.exports = uploadNote;
