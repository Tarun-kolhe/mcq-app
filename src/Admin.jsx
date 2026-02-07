import { useState } from "react";
import "./Admin.css"
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate=useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleNavigateHome= ()=>{navigate("/");}

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

   const handleSubmit = async () => {
    if (!question || options.includes("") || !answer) {
      alert("Please fill all fields");
      return;
    }

    await fetch("https://mcq-backend-yggc.onrender.com/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options, answer })
    });

    alert("Question Added Successfully");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  const handleClearAll = async () => {
  const confirmClear = window.confirm(
    "⚠️ Are you sure you want to delete ALL questions?"
  );

  if (!confirmClear) return;

  await fetch("https://mcq-backend-yggc.onrender.com/questions", {
    method: "DELETE"
  });

  alert("All questions cleared successfully");
};


  return (
    <div className="card">
         <button className="home-btn" onClick={handleNavigateHome}>
          🏠 Home
        </button>
      <h2>Admin – Add Question</h2>

      <input
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
        />
      ))}

      <input
        placeholder="Correct Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    <div className="btn_cont">
      <button onClick={handleSubmit}>Add Question</button>
      <button className="btn" onClick={handleClearAll}>
      ❌ Clear All Questions
      </button>
    </div>
     

    </div>
  );
}

export default Admin;
