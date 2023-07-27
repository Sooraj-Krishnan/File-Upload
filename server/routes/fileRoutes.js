// backend/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');

// Configure multer to handle file uploads with size limit (10MB)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
     // cb(null, Date.now() + path.extname(file.originalname));
      cb(null, file.originalname);
      
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB size limit
  },
});

// Upload file route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
     console.log('file path :' , req.file.path);
    const { filename, path } = req.file;
    const fileId = Math.floor(Math.random() * 1000) + 1;

    const newFile = new File({
      fileId,
      fileName: filename,
      filePath: path,
    });

    await newFile.save();

    res.json({
      fileId,
      fileName: filename,
    });
  } catch (err) {
    res.status(500).json({ error: 'File upload failed.' });
  }
});

/*

// Define a map to store the MIME type mappings
const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  // Add more mappings for other file types if needed
};

*/

// Download file route
router.get('/download/:fileId', async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const file = await File.findOne({ fileId });

    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }
    
    console.log('Setting Content-Disposition header:', file.fileName);
    res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
    console.log('Content-Disposition header set.');
   

    
    // Set the Content-Type header based on the file extension
    // const fileExtension = path.extname(file.fileName).toLowerCase();
    // const contentType = mimeTypes[fileExtension] || 'application/octet-stream';

    // res.setHeader('Content-Type', contentType);


    res.download(file.filePath, file.fileName);
  } catch (err) {
    res.status(500).json({ error: 'Failed to download the file.' });
  }
});


module.exports = router;
