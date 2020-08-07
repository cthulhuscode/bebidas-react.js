import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  // useState
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    category: "",
  });
  const [doQuery, setDoQuery] = useState(false);

  // useEffect
  useEffect(() => {
    if (doQuery) {
      const getRecipes = async () => {
        const { ingredient, category } = search;
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;
        const result = await axios.get(url);
        setRecipes(result.data.drinks);
      };
      getRecipes();
      setDoQuery(false);
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setSearch,
        setDoQuery,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
