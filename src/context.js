import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get("http://localhost:5000");
      const data = await resp.data.questions;
      console.log("Data: ", data);
      setQuestionList(data);
      //console.log("Questions: ", questionList);
    };
    getData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        hasClicked,
        setHasClicked,
        questionList,
        setQuestionList,
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
