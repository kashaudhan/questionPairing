import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [questionList, setQuestionList] = useState(null);
  const [inputQuestions, setInputQuestions] = useState({ q1: "", q2: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get("http://localhost:5000");
      const data = await resp.data.questions;
      console.log("Data: ", data);
      setQuestionList({ questionList: data });
      console.log("Questions: ", questionList);
    };
    getData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        questionList,
        setQuestionList,
        inputQuestions,
        setInputQuestions,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
