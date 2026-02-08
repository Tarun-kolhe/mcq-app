const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // 🔥 important for reading JSON from UI

// 👉 Get all questions
app.get("/questions", (req, res) => {
  db.all("SELECT * FROM questions", (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

app.post("/questions", (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO questions
    (question, option1, option2, option3, option4, answer)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // If multiple questions
  if (Array.isArray(data)) {
    const stmt = db.prepare(sql);

    data.forEach((q) => {
      if (q.question && q.options && q.options.length === 4 && q.answer) {
        stmt.run([
          q.question,
          q.options[0],
          q.options[1],
          q.options[2],
          q.options[3],
          q.answer
        ]);
      }
    });

    stmt.finalize();
    return res.status(201).json({ message: "Bulk questions added" });
  }

  // If single question (existing behavior)
  const { question, options, answer } = data;

  if (!question || !options || options.length !== 4 || !answer) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.run(
    sql,
    [question, options[0], options[1], options[2], options[3], answer],
    function (err) {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Question added successfully",
        id: this.lastID
      });
    }
  );
});


//  Clear all questions (Admin only)
app.delete("/questions", (req, res) => {
  const sql = "DELETE FROM questions";

  db.run(sql, function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "All questions deleted successfully",
      deletedCount: this.changes
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
