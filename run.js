// Import necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import filter from "./filter.js"; // Custom filter module
import filter1 from "./filter1.js"; // Another custom filter module

// Load environment variables from a .env file
dotenv.config();

// Create an instance of GoogleGenerativeAI with the provided API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Define an asynchronous function to run the code conversion and explanation tasks
async function run(target, source, code) {
  let prompt = `convert this ${source} language to ${target} give me only code \n` + code;


  // If prompt length exceeds 28000 characters, split the code into halves
  if (prompt.length > 28000) {
    const length = code.length;
    const midpoint = Math.floor(length / 2);
    
    const firstHalf = code.substring(0, midpoint);
    const secondHalf = code.substring(midpoint);
    
    prompt = `convert this ${source} language to ${target} give me only code \n`+code;
    
    // Generate content for each half separately
    let op = filter(await generate(prompt + "\n" + firstHalf));
    let op2 = filter(await generate(prompt + "\n" + secondHalf));
    var opf = filter(await generate("correct the program" + op + op2));
    prompt = `Explain the code logic of the below and also explain us the approach how to convert to ${target} ill convert by myself dont convert it for me just explain\n`+firstHalf;
    let logic1=filter1(await generate(prompt));
    prompt = `Explain the code logic of the below and also explain us the approach how to convert to ${target} ill convert by myself dont convert it for me just explain\n`+firstHalf;
    let logic2=filter1(await generate(prompt));
    var logic=filter1(await generate("check n correct"+logic1+logic2))

    
  } else {
    // Generate content for the whole code
    var opf = filter(await generate(prompt));
    prompt = `Explain the code logic of the below and also explain us the approach how to convert to ${target} ill convert by myself dont convert it for me just explain\n`+code;
    var logic=filter1(await generate(prompt));

  }
 
  // Write the generated content to a file named "hi.txt"
  fs.writeFileSync("hi.txt", opf);

  // Construct a prompt to explain the code logic and approach
  
  
  // Write the generated explanation to a file named "new.txt"
  fs.writeFileSync("new.txt",logic);
}

// Define an asynchronous function to generate content using Google's Generative AI model
const generate = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

// Export the run function
export default run;
