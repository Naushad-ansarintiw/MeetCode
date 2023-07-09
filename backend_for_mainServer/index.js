require('dotenv').config();
require('./db/conn');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const {Problems} = require('./Problem/problems.js');
const Job = require('./models/Job.js');
const { executePy } = require('./executePython');
const { runCppTests } = require('./executeCpp1.js'); // Import the test function
const { generateFile } = require('./generateFile.js');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8080;


app.get('/problems',(req,res) => {
    console.log("INsise");
    res.status(200).json(Problems)
});

app.get('/status', async (req, res) => {
    const jobId = req.query.id;
    console.log("status requested", jobId);
    if (jobId === undefined) {
        return res.status(404).json({ success: false, error: "missing id" });
    }
    try {
        const job = await Job.findById(jobId);
        if (job === undefined) {
            return res.status(404).json({ success: false, error: "invalid job id" });
        }

        return res.status(200).json({ success: true, job });

    } catch (error) {
        return res.status(404).json({ success: false, error: JSON.stringify(error) });
    }
})

app.post('/submission/:id',async (req,res) => {
    const { id } = req.params;
    const { language, code } = req.body;
    console.log(id, language, code);
    let filePath = '';
    let job = {};
    // Find the problem object based on the problemId
    const problem = Problems.find(element => element.problemId === id);
    console.log(problem.testCases);
    if (!problem) {
      // Handle the case where the problem is not found
      return res.status(404).json({ error: 'Problem not found' });
    }
    
  // Generate cpp file with content
    generateFile(language, code)
    .then(async (filepath) => {
      job = await new Job({language, filepath});
      const jobId = job["_id"];
      filePath = filepath;
      res.status(201).json({success: true, jobId});
      console.log(job);
      return (language === "cpp") ? runCppTests(filepath, problem.testCases.Cases) : executePy(filepath);
    })
    .then(async ({ error,stderr, stdout}) => { // Destructure the response object
      if (error) {
        console.error(error + "INDF");
        reject({error});
        // res.status(500).json({ success: false, error: "Error Occurred" });
      } else if (stderr) {
        console.log(stderr + "IND ");
        reject({stderr});
        // res.status(500).json({ success: false, error: "Error Occurred" });
      } else {
         // file details to make a path for delete
         const outputPath = path.join(__dirname, "outputs");
         const jobId = path.basename(filePath).split('.')[0];
         const outPath = path.join(outputPath, `${jobId}.exe`);
         // now deleting the both compile and executeble file
         const filePaths = [filePath,outPath];
         filePaths.forEach(filePath => {
           fs.access(filePath, fs.constants.F_OK, (err) => {
             if (err) {
               console.error('Error accessing the file:', err);
               return;
             }
         
             fs.unlink(filePath, (err) => {
               if (err) {
                 console.error('Error deleting the file:', err);
                 return;
               }
             
               console.log('File deleted successfully!');
             });
           });
         });
         job["status"] = "success";
        if (stdout === "All tests passed") {
          job.output.success = true;
          job.output.result = "All tests passed";
          console.log({ success: true, output: "All tests passed" });
        }
        else {
            job.output.result = stdout;
            console.log(stdout);
        }
        await job.save();
      }
    })
    .catch(async (err) => {
        job["status"] = "error";
        job.output.result = err;
        await job.save();
    });
});


app.listen(port, function () {
    console.log('listening on port' + port);
});