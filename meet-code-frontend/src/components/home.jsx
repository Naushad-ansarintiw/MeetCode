import React from 'react'
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
        <div className="navbar">
          <div className="left">
          <Link to='/'><img src="https://theme.zdassets.com/theme_assets/9008406/036323c6afd10392aa5b7e3a2eb7557d17955c81.png" alt="logo" /></Link>
          </div>
          <div className="center">
            <Link to="/problems" className='link'>Problems</Link>
            <Link href="/signup" className='link'>SignUp</Link>
            <Link href="/login" className='link'>Login</Link>
          </div>
        </div>
        <div className="container">
          <p>MeetCode is a comprehensive online platform designed to help users practice Data Structures and Algorithms (DSA) questions. It serves as a valuable resource for programmers, software engineers, and computer science students who wish to enhance their problem-solving skills and excel in technical interviews.</p>
          <p>MeetCode provides an interactive coding environment where users can solve the DSA questions directly on the website. The coding environment supports multiple programming languages, such as C++, Java, Python, and JavaScript, enabling users to code in their preferred language.</p>
          <p>MeetCode offers timed tests and assessments to simulate real-world coding scenarios. These tests help users practice coding under time constraints and evaluate their performance. Users receive detailed feedback and performance metrics, allowing them to identify areas for improvement.</p>
        </div>
    </>
  )
}

export default Home

