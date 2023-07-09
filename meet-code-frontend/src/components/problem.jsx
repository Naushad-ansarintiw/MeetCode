import React from 'react'
import styles from './Problems.module.css'; // Import CSS module
import {Link} from 'react-router-dom';

const Problem = ({problemId, name, difficulty, acceptance}) => {
    let difficultyColor;

    if (difficulty === 'Hard') {
      difficultyColor = 'red';
    } else if (difficulty === 'Medium') {
      difficultyColor = 'orange';
    } else if (difficulty === 'Easy') {
      difficultyColor = 'darkgreen';
    }
  
    const tdStyle = {
      color: difficultyColor,
    };

    return (
        <tr>
            <td className={styles.tdproblem}>
               <Link to={`/problems/individual/${problemId}`} style={{textDecoration: 'none', color: 'black'}}> <p className={styles.problempara}>{name}</p></Link>
            </td>
            <td className={styles.tddiff}>
                <p className={styles.diffpara} style={tdStyle} >{difficulty}</p>
            </td>
            <td className={styles.tdacceptance}>
                <p className={styles.acceptancepara} style={tdStyle}>{acceptance}</p>
            </td>
        </tr>
    )
};

export default Problem
