import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Make Context
export const ModalContext = createContext();

const ModalProvider = (props) => {
  // State del Provider
  const [idRecipe, setIdRecipe] = useState(null);
  const [recipeInfo, setRecipe] = useState({});

  // useEffect
  useEffect(() => {
    if (!idRecipe) return;

    const getDrinkInfo = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
      const result = await axios.get(url);
      setRecipe(result.data.drinks[0]);
    };
    getDrinkInfo();
  }, [idRecipe]);

  return (
    <ModalContext.Provider
      value={{
        recipeInfo,
        setIdRecipe,
        setRecipe,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
