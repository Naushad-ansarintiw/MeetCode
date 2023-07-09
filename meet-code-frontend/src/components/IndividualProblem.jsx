import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Problems.module.css'; // Import CSS module
import stubs from './defaultStufs';



const IndividualProblem = () => {

  const { id } = useParams();
  const [problems, setProblems] = useState([]);
  const [data, setData] = useState({
    title: "",
    difficulty: "",
    acceptance: "",
    description: "",
    exampleIn: "",
    exampleOut: "",
  });
  // for getting the input code from users 
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp')
  // for setting the ouput code
  const [codeOutput, setCodeOutput] = useState('');
  // for setting the jobId
  const [jobId, setJobId] = useState('');

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  useEffect(() => {
    axios.get('http://localhost:8080/problems')
      .then(data => {
        console.log(data.data);
        setProblems(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (problems.length > 0) {
      const problem = problems.find(problem => problem.problemId === id);
      if (problem) {
        const updatedObject = {
          title: problem.title,
          difficulty: problem.difficulty,
          acceptance: problem.acceptance,
          description: problem.description,
          exampleIn: problem.exampleIn,
          exampleOut: problem.exampleOut,
        };
        setData(updatedObject);
      }
    }
  }, [problems, id]);


  useEffect(() => {
    let intervalId;

    const fetchJobStatus = async () => {
      try {
        const { data: dataRes } = await axios.get('http://localhost:8080/status', {
          params: { id: jobId }
        });

        const { success, job } = dataRes;
        console.log(job);

        if (success && (job.status === 'success' || job.status === 'pending')) {
          const { status: jobStatus, output: jobOutput } = job;

          if (jobStatus === 'pending') return;

          console.log(jobOutput);
          if (jobOutput.result !== "All tests passed") {
            let { input, expectedOutput, output } = jobOutput.result[0];
            setCodeOutput(`Failed Test Case: Input: ${input}, expected: ${expectedOutput}, output: ${output}`);
          }
          else {
            setCodeOutput(jobOutput.result);
          }
          clearInterval(intervalId);
        } else {
          // console.log("Hello");
          console.log(job.output.result.err.error);
          let error = job.output.result.err.error;
          const regex = /error:\s*(.*)/;
          error = (language == "cpp") ? error.match(regex)[1].trim() : error.split("SyntaxError:");
          console.log(error);
          setCodeOutput(error);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (jobId) {
      intervalId = setInterval(fetchJobStatus, 3000);
    }

    return () => clearInterval(intervalId);
  }, [jobId]);


  // -----------Handle the Submit button-------------
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };

    try {
      const { data } = await axios.post(`http://localhost:8080/submission/${id}`, payload);
      console.log(data);
      setCodeOutput("Submission Queued");
      console.log(data);
      setJobId(data.jobId);

    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err;
        setCodeOutput(errMsg);
      }
      else {
        setCodeOutput("Error Connecting to server");
      }
    }

  }

  let difficultycolor;

  if (data.difficulty === 'Hard') {
    difficultycolor = 'red';
  } else if (data.difficulty === 'Medium') {
    difficultycolor = 'orange';
  } else if (data.difficulty === 'Easy') {
    difficultycolor = 'darkgreen';
  }

  const h4style = {
    color: difficultycolor,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.description}>
            <h2>{data.title}</h2>
            <h4 style={h4style}>{data.difficulty}</h4>
            <p>{data.description}</p>
          </div>
          <div className={styles.inputOutput}>
            <div className={styles.input}>
              <h3>Input</h3>
              <pre>{data.exampleIn}</pre>
            </div>
            <div className={styles.output}>
              <h3>Output</h3>
              <pre>{data.exampleOut}</pre>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.editor}>
            <div>
              <label>Language: </label>
              <select value={language}
                onChange={
                  (e) => {
                    setLanguage(e.target.value);
                    console.log(e.target.value);
                  }
                }
              >
                <option value="cpp">C++</option>
                <option value="py">Python</option>
              </select>
            </div>
            <br />
            <textarea className={styles.input}
              placeholder="Write your code here"
              value={code}
              onChange={(e) => { setCode(e.target.value) }}>
            </textarea>
            <pre className={styles.output}>{codeOutput}</pre>
          </div>
          <button className="submitbutton" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default IndividualProblem








