import { HashRouter, Routes, Route } from "react-router-dom";
import Quiz from "./Quiz";
import Admin from "./Admin";
import Home from "./Home";
import AdminLogin from "./AdminLogin";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Quiz />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
