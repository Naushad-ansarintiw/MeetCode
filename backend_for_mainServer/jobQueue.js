const Queue = require('bull');
const path = require('path');
const fs = require('fs');
const Job = require('./models/Job');
const { Problems } = require('./Problem/problems.js');
const { executePy } = require('./executePython');
const { runCppTests } = require('./executeCpp1.js'); // Import the test function

const jobQueue = new Queue('job-queue');
const NUM_WORKERS = 5;




jobQueue.process(NUM_WORKERS, async ({ data }) => {
    console.log(data);
    const { id: jobId, paramId: id } = data;
    const job = await Job.findById(jobId);
    if (job === undefined) {
        throw new Error("job not found");
    }

    // Find the problem object based on the problemId
    const problem = Problems.find(element => element.problemId === id);
    console.log(problem.testCases);
    if (!problem) {
        // Handle the case where the problem is not found
        throw Error("Problem Not Found");
    }

    try {
        let output;
        if (job.language === "cpp") {
            output = await runCppTests(job.filepath, problem.testCases.Cases);
        } else if (job.language === "py") {
            output = await executePy(job.filepath);
        }

        const { error, stderr, stdout } = output;

        if (error) {
            throw new Error("error:", error);
            // res.status(500).json({ success: false, error: "Error Occurred" });
        } else if (stderr) {
            // console.log(stderr + "IND ");
            throw new Error("error:", stderr);
            // res.status(500).json({ success: false, error: "Error Occurred" });
        } else {
            // file details to make a path for delete
            const outputPath = path.join(__dirname, "outputs");
            const jobId = path.basename(job.filepath).split('.')[0];
            const outPath = path.join(outputPath, `${jobId}.exe`);
            // now deleting the both compile and executeble file
            const filePaths = (job.language === "cpp") ? [job.filepath, outPath] : [job.filepath];
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
                // res.status(200).json({ success: true, output: "All tests passed" });
                job.output.success = true;
                job.output.result = "All tests passed";
                console.log({ success: true, output: "All tests passed" });
            }
            else {
                job.output.result = stdout;
                console.log(stdout);
                // res.status(201).json({success: false, output: stdout});
            }
            // console.log(job);
            await job.save();
            return true;
        }

    } catch (error) {
        job["status"] = "error";
        job.output.result = error;
        await job.save();
        console.error(error);
        throw Error(JSON.stringify(error));
    }

})

jobQueue.on('failed', (error) => {
    console.log(error.data.id, "failed", error.failedReason);
})


const addJobToQueue = async (jobId, id) => {
    await jobQueue.add({
        id: jobId,
        paramId: id,
    });
}

module.exports = {
    addJobToQueue
}