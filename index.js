import express from 'express';
import bodyParser from 'body-parser';
import fs from "fs/promises";
import bs from "fs";
import run from "./run.js";
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from "path"
import info from "./info.js"

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "hi.txt");
    }
});

// Init upload
const upload = multer({
    storage: storage
}).single('fileUpload');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Simple route to render the index.ejs file
app.get('/', (req, res) => {
  res.render("index.ejs");
});

// Route handler for POST requests to /convert
app.post('/convert', async (req, res) => {
    try {
        // Write source code to file
        await fs.writeFile("example.txt", req.body.sourceCode);
        console.log("Source code written to file successfully.");
        
        // Run conversion process
        await run(req.body.targetLanguage, req.body.sourceLanguage);

        // Read converted code from file
        let convertedCode = await fs.readFile("hi.txt", "utf8");
        // Render index.ejs with converted code and source code
        res.render("index.ejs", {
            convertedCode: convertedCode,
            sourceCode: req.body.sourceCode,
            targetLanguage:req.body.targetLanguage,
            sourceLanguage:req.body.sourceLanguage
        });
    } catch (error) {
        console.error("Error converting code:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/download/:fileName', (req, res) => {
console.log();
    const filePath = path.join(__dirname, "hi.txt");

    // Send the file to the client for download
    res.download(filePath, "converted"+info[req.params.fileName], (err) => {
        if (err) {
            // Handle errors, such as file not found
            console.error('Error downloading file:', err);
            res.status(404).send('File not found');
        }
    });
});

app.get('/breakdown',(req,res)=>{
    res.render("break.ejs",{
        info:bs.readFileSync("new.txt","utf8")
    })
})

// File upload endpoint
app.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
      try {
          if (err) {
              console.error("Error uploading file:", err);
              return res.status(500).send("Error uploading file");
          }
          
          if (!req.file) {
              console.error("No file selected");
              return res.status(400).send("No file selected");
          }

          // File uploaded successfully
          console.log("File uploaded:", req.file);
          
          // Read the uploaded file
          let data = await fs.readFile("uploads/hi.txt", "utf8");
          
          // Render index.ejs with the source code
          res.render("index.ejs", {
              sourceCode: data
          });
      } catch (error) {
          console.error("Error processing uploaded file:", error);
          res.status(500).send("Error processing uploaded file");
      }
  });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




const express = require('express');
const ejs = require('ejs');
const { load_dataset } = require('datasets');

const app = express();

// Load dataset
const ds = load_dataset("codeparrot/github-code", { streaming: true, split: "train" });

// Route to render EJS template
app.get('/', async (req, res) => {
    try {
        // Fetch code snippets
        const codeSnippets = await ds.iterator().next();

        // Render EJS template with code snippets data
        res.render('index', { codeSnippets });
    } catch (error) {
        console.error('Error fetching code snippets:', error);
        res.status(500).send('Error fetching code snippets');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
