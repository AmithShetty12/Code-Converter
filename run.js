import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import filter from "./filter.js";
import filter1 from "./filter1.js"

dotenv.config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(target,source) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `convert this ${source} language to ${target} give me only code \n`+fs.readFileSync("example.txt","utf8")
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  fs.writeFileSync("hi.txt",filter(text))
  const prompt1 = `Explain the code logic of the below and also explain us the approach how to convert to  ${target}  ill convert by myself dont convert it for me just explain\n`+fs.readFileSync("example.txt","utf8")
  const result1 = await model.generateContent(prompt1);
  const response1 = await result1.response;
  const text1 = response1.text();
  fs.writeFileSync("new.txt",filter1(text1))
}

export default run;
