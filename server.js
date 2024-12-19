const express = require('express');
const { upload, ensureUploadDirectory } = require('./multer');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const app = express();

// Middleware: Serve static files
app.use('/uploads', express.static(ensureUploadDirectory()));

// Route: Single file upload
app.post('/upload/single', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  res.status(200).send({
    message: 'File uploaded successfully!',
    fileUrl: `/uploads/${file.filename}`,
  });
});

// Route: Multiple file uploads
app.post('/upload/multiple', upload.array('files', 5), (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send({ message: 'No files uploaded.' });
  }

  const fileUrls = files.map(file => `/uploads/${file.filename}`);
  res.status(200).send({
    message: 'Files uploaded successfully!',
    fileUrls,
  });
});

// Route: Download file
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(ensureUploadDirectory(), filename);

  if (fs.existsSync(filePath)) {
    return res.download(filePath, filename, (err) => {
      if (err) {
        res.status(500).send({ message: 'File download failed.', error: err.message });
      }
    });
  }
  return res.status(404).send({ message: 'File not found.' });
});

// Global error handler for file upload errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).send({ message: err.message });
  }
  next(err);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
