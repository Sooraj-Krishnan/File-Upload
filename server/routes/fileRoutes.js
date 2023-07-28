// backend/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');

    const upload = multer({
      storage: multer.memoryStorage(), // Store the uploaded file in memory as a Buffer
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB size limit
      },
    });
    
    router.post('/upload', upload.single('file'), async (req, res) => {
      try {
        const { originalname, buffer } = req.file;
        const fileId = Math.floor(Math.random() * 1000) + 1;
    
        const newFile = new File({
          fileId,
          fileName: originalname,
          fileData: buffer, // Store the binary data directly
        });
    
    await newFile.save();

    res.json({
      fileId,
      fileName: originalname,
    });
  } catch (err) {
    res.status(500).json({ error: 'File upload failed.' });
  }
});



router.get('/download/:fileId', async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const file = await File.findOne({ fileId });

    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }

    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    // Set the Content-Disposition header to trigger file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);

    // Send the file data as response
    res.send(file.fileData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to download the file.' });
  }
});

module.exports = router;
