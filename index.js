import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import readline from 'readline';

config();

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
 
function start() {
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
   });
   
   rl.question('Em que posso ajudar? \n=> ', (prompt) => {
      run(prompt);
    
      rl.close();
   });   
}
async function run(prompt) {
   console.log("\nAguarde, estou processando as informações...\n");

   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   const result = await model.generateContent(prompt);
   const response = await result.response;
   const text = response.text();

   console.log(`${text}\n`);

   start();
}

start();