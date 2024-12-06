import React, { useState } from 'react';
import styles from '../styles/Quiz.module.css';

const Quiz = () => {
  const questions = [
    {
      question: "What is the primary component of the human circulatory system?",
      options: ["Heart", "Liver", "Kidney", "Lungs"],
      correctAnswer: "Heart"
    },
    {
      question: "What percentage of the human body is water?",
      options: ["30%", "50%", "60%", "70%"],
      correctAnswer: "60%"
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Skin", "Liver", "Brain"],
      correctAnswer: "Skin"
    },
    {
      question: "What process do plants use to convert sunlight into energy?",
      options: ["Respiration", "Photosynthesis", "Transpiration", "Osmosis"],
      correctAnswer: "Photosynthesis"
    },
    {
      question: "What percentage of Earth's surface is covered by oceans?",
      options: ["50%", "60%", "70%", "80%"],
      correctAnswer: "70%"
    },
    {
      question: "Which gas is essential for human respiration?",
      options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"],
      correctAnswer: "Oxygen"
    },
    {
      question: "What is the main cause of ocean acidification?",
      options: ["Plastic pollution", "Oil spills", "Excess CO2", "Overfishing"],
      correctAnswer: "Excess CO2"
    },
    {
      question: "What is the salinity of seawater?",
      options: ["1.5%", "2.5%", "3.5%", "4.5%"],
      correctAnswer: "3.5%"
    },
    {
      question: "What is the smallest bone in the human body?",
      options: ["Femur", "Stapes", "Humerus", "Tibia"],
      correctAnswer: "Stapes"
    },
    {
      question: "What is the main function of coral reefs?",
      options: ["Provide food", "Control climate", "Protect coastlines", "Generate oxygen"],
      correctAnswer: "Protect coastlines"
    }
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [score, setScore] = useState(null);

  const handleChange = (e, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore += 10;
      }
    });
    setScore(newScore);
  };

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.h2}>Take the Quiz</h2>
      {questions.map((question, index) => (
        <div key={index} className={styles.question}>
          <h3>{question.question}</h3>
          {question.options.map((option, i) => (
            <label key={i} className={styles.option}>
              <input 
                type="checkbox" 
                value={option}
                checked={answers[index] === option}
                onChange={(e) => handleChange(e, index)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button className={styles.submitButton} onClick={calculateScore}>Submit</button>
      {score !== null && <div className={styles.score}>Your Score: {score}/100</div>}
    </div>
  );
};

export default Quiz;
