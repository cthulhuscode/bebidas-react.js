import React, { useContext } from "react";

import { RecipesContext } from "../context/RecipesContext";

// Components
import Recipe from "./Recipe";

const RecipesList = () => {
  // useContext
  const { recipes } = useContext(RecipesContext);

  if (!recipes) return null;

  return (
    <div className="row mt-5">
      {recipes.map((recipe) => (
        <Recipe key={recipe.idDrink} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesList;
