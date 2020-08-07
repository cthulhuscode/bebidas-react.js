import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el Context
export const CategoriesContext = createContext();

// Provider: Es donde se encuentran los datos, las funciones y state
const CategoriesProvider = (props) => {
  // Crear State del Context
  const [categories, setCategories] = useState([]);

  // useEffect
  //Call the API - Get categories
  useEffect(() => {
    const getCategories = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
      const result = await axios.get(url);
      /*
      const categories = result.data.drinks.map(
        (category) => category.strCategory
      );
      console.log(categories);
      */
      setCategories(result.data.drinks);
    };
    getCategories();
  }, []);

  // Los datos y todo lo que estará disponible para los componentes
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
