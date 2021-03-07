import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((respData) => {
        return respData.data.questions.map((item) => {
          return { id: item._id, question: item.question };
        });
      })
      .then((list) => {
        console.log("lit ", list);
        setQuestionList(list);
      });
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
