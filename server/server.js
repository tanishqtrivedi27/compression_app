import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";

/* MIDDLEWARES*/
import { validateFileType } from "./middleware/validateTextFile.js";

/* CONTROLLERS */
import { readTextFile } from "./controllers/readTextFile.js";

/*CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 5000 || process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* FILE STORAGE */
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
			cb(null, 'public/uploads/');
	}, 
	filename: function(req, file, cb) {
			cb(null, file.originalname);
	}
});

const upload = multer({ storage });

/* ROUTES */
app.post('/upload', upload.single('file'), validateFileType, readTextFile);

app.get('/download', (req, res) => {
	const file = path.join(__dirname, 'public/downloads/compressed.txt');
	res.download(file, 'compressed.txt');
});

app.delete('/delete', (req, res) => {
	const file = path.join(__dirname, 'public/downloads/compressed.txt');
	fs.unlinkSync(file);
});
  
  
app.get('/', (req, res) => {
		res.status(200);
		res.send("OK OK")
});

app.listen(port, console.log(`Server running at ${port}`));