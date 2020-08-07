import React, { useContext } from "react";

import { ModalContext } from "../context/ModalContext";

const Recipe = ({ recipe }) => {
  // States
  const { strDrink, strDrinkThumb, idDrink } = recipe;

  // useContext
  const { setIdRecipe } = useContext(ModalContext);

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{strDrink}</h2>
        <img className="card-img-top" src={strDrinkThumb} alt={strDrink} />
        <div className="card-body">
          <button
            onClick={() => {
              setIdRecipe(idDrink);
            }}
            type="button"
            className="btn btn-block btn-primary"
          >
            Ver receta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
