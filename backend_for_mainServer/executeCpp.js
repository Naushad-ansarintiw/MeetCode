const { exec,spawn } = require('child_process');
const fs  = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = (filePath,testCases) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log("INside EXecuting");
    return new Promise((resolve, reject) => {
        // Compile the code
        exec(`g++ ${filePath} -o ${outPath}`, (compileError, compileStdout, compileStderr) => {
          if (compileError) {
            reject({ error: compileError.message });
            return;
          }
          if (compileStderr) {
            reject({ stderr: compileStderr.toString() });
            return;
          }
          
          let hasFailedTestCase = false;
          const results = [];
          const fileTestCase = [];
  
          // Execute the code for each test case
          testCases.forEach((testCase) => {
            const { input, expectedOutput } = testCase;
            
            const process = spawn(outPath);
  
            let output = '';
            let errorOutput = '';
  
            const array = input.trim().split("\n").map(str => str.trim());
            array.map(ele => {
              process.stdin.write(ele + "\n");
            })
            process.stdin.end();
  
            process.stdout.on('data', (data) => {
              output += data.toString();
            });
  
            process.stderr.on('data', (data) => {
              errorOutput += data.toString();
            });
  
            process.on('error', (error) => {
              reject({ error: error.message });
            });
  
            process.on('close', (code) => {
              if (code !== 0) {
                reject({ stderr: errorOutput });
              } else {
                // Compare the actual output with the expected output
                const result = output.trim() === expectedOutput ? 'pass' : 'fail';
                // console.log(result);
                // console.log(output.trim() + " " + expectedOutput);
                if(result === 'pass') {
                    // console.log("INside ");
                    results.push({ input, expectedOutput, output, result });
                }
                else {
                    // console.log("INside ");
                    fileTestCase.push({input, expectedOutput, output, result});
                    hasFailedTestCase = true; // Set the flag if a failed test case is encountered
                }
              }
              // If all test cases have been executed, resolve with the results or failed test cases
               if (results.length + fileTestCase.length === testCases.length) {
                if (hasFailedTestCase) {
                 console.log(fileTestCase);
                  resolve({ stdout: fileTestCase});
                } else {
                 console.log(results);
                  resolve({ stdout: results });
                }
              }
            });
          });
        });
    });
  };
  
module.exports = {
    executeCpp
}