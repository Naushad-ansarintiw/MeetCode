import axios from 'axios';
import React , {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './Problems.module.css'; // Import CSS module
import Problem from './problem.jsx';
// import PROblem from './Problems.js'


const Problems = ()=> {
  const [Problems, setProblems] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8080/problems')
     .then(data => {
        console.log(data);
        setProblems(data.data);
     })
     .catch(err => {
      console.log(err);
     })
  },[]);

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/">
            <img
              src="https://theme.zdassets.com/theme_assets/9008406/036323c6afd10392aa5b7e3a2eb7557d17955c81.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className={styles.center}>
          <Link to="/problems" className={styles.link}>Problems</Link>
          <Link to="/signup" className={styles.link}>SignUp</Link>
          <Link to="/login" className={styles.link}>Login</Link>
        </div>
      </div>
      <div className={styles.topic}>
        Data <span>Structures</span> and <span>Algorithms</span>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.title}>Title</th>
            <th className={styles.diff}>Difficulty</th>
            <th className={styles.acceptance}>Acceptance</th>
          </tr>
        </thead>
        <tbody>
        {
          Problems.map(problem => <Problem key={problem.problemId} problemId={problem.problemId} name={problem.title} difficulty={problem.difficulty} acceptance={problem.acceptance}/>)
        }
        </tbody>
      </table>
    </>   
  );
};

export default Problems;
