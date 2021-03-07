import React from "react";
import InputCard from "./components/InputCard";
import QuestionList from "./components/QuestionList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main__container">
        <InputCard />
        <QuestionList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
