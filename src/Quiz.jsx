import { useEffect, useState } from "react";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate= useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("API error:", err));
  }, []);
  
  function handleNavigateHome(){
    navigate("/");
  }
  if (!questions.length) {
    return <h2 className="quiz-loading">Loading...</h2>;
  }

  //  quiz completed
  if (currentIndex === questions.length) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2 className="quiz-complete-title"> Quiz Completed 🎉</h2>
          <h3 className="quiz-score">
            Your Score: {score} / {questions.length}
          </h3>
           <button className="quiz-home-btn" onClick={handleNavigateHome}>
          🏠 Home
        </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
          <button className="quiz-home-btn" onClick={handleNavigateHome}>
          🏠 Home
        </button>
        <h3 className="quiz-counter">
          Question {currentIndex + 1} / {questions.length}
        </h3>

        <h2 className="quiz-question">{currentQuestion.question}</h2>

        <ul className="quiz-options">
          {[
            currentQuestion.option1,
            currentQuestion.option2,
            currentQuestion.option3,
            currentQuestion.option4
          ].map((option) => (
            <li key={option} className="quiz-option-item">
              <label className="quiz-option-label">
                <input
                  type="radio"
                  name="option"
                  className="quiz-radio"
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>

        <button 
          className="quiz-button" 
          disabled={!selectedOption} 
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;