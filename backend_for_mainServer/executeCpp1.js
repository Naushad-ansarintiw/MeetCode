const { executeCpp } = require('./executeCpp.js');


// Define the test function
const runCppTests = async (codeFilePath, testCases) => {
    console.log("Inside");
    return new Promise((resolve, reject) => {
         executeCpp(codeFilePath,testCases)
            .then(({error, stderr, stdout}) => {
                if (error) {
                    console.error(error);
                    reject({error});
                  } else if (stderr) {
                    console.log(stderr);
                    reject({stderr});
                  } else {
                    console.log("HELKDEL");
                    let FailTestCase = [];
                    let hasFailedTestCase = false;
                    FailTestCase = stdout.filter(Case =>{
                        if(Case.result === 'fail'){
                            hasFailedTestCase = true;
                            return true;
                        }
                        else return false;
                    });
                    if(hasFailedTestCase){
                        console.log(FailTestCase + "INsisde");
                        resolve({stdout: FailTestCase});
                    }
                    else {
                        resolve({stdout: "All tests passed"});
                    }
                  }
            })
            .catch(err => {
                console.error(err);
                reject({err});
            })
    });
};

module.exports = { runCppTests };