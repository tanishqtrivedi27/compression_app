import fs from "fs";

// Validate file type middleware
export const validateFileType = (req, res, next) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }
  
    // Check if the file type is text/plain
    if (req.file.mimetype !== 'text/plain') {
        fs.unlinkSync(req.file.path);
        return res.status(400).send({ message: 'Invalid file type. Only text files are allowed.' });
    }
  
    next();
};
  