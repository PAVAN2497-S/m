const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');
const configDB = require('./config/db');
const User = require('./app/model/user'); // Import the User model

app.use(express.json());
app.use(cors());
configDB();
app.use('/public/images', express.static('public/images'));
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/images');
   },
   filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
   },
});

const upload = multer({
   storage,
   limits: { fileSize: 1 * 1024 * 1024 }, 
});


app.post('/upload', (req, res) => {
   upload.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
         return res.status(400).json({ error: 'File too large. Max size is 1MB' });
      } else if (err) {
         return res.status(500).json({ error: 'Server error while uploading file' });
      }

      try {
         const result = await User.create({ image: req.file.filename });
         return res.json(result);
      } catch (e) {
         return res.status(500).json({ error: 'Server error while uploading file' });
      }
   });
});


app.listen(5000, () => {
   console.log('Server running on port 5000');
});
