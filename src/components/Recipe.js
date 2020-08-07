import React, { useContext, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import { ModalContext } from "../context/ModalContext";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "90%",
    maxWidth: "500px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "100%",
    maxHeight: 900,
    display: "block",
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: "12px 0",
    overflow: "scroll",
  },
}));

const Recipe = ({ recipe }) => {
  // Config Modal
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { strDrink, strDrinkThumb, idDrink } = recipe;

  // useContext
  const { setIdRecipe, recipeInfo, setRecipe } = useContext(ModalContext);

  // Show and format the ingredients
  const showIngredients = (recipeInfo) => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (
        recipeInfo[`strIngredient${i}`] !== null &&
        recipeInfo[`strIngredient${i}`] !== ""
      )
        ingredients.push(
          <li key={uuidv4()}>
            {recipeInfo[`strIngredient${i}`]}
            {recipeInfo[`strMeasure${i}`] !== null &&
            recipeInfo[`strMeasure${i}`] !== ""
              ? "  -  " + recipeInfo[`strMeasure${i}`]
              : null}
          </li>
        );
    }
    return ingredients;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{strDrink}</h2>
        <img className="card-img-top" src={strDrinkThumb} alt={strDrink} />
        <div className="card-body">
          <button
            onClick={() => {
              setIdRecipe(idDrink);
              handleOpen();
            }}
            type="button"
            className="btn btn-block btn-primary"
            style={{ backgroundColor: "#ffc000", borderColor: "#ffc000" }}
          >
            Ver receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdRecipe(null);
              setRecipe({});
              handleClose();
            }}
          >
            <div className={classes.paper} style={modalStyle}>
              <h2 className={classes.header}>{recipeInfo.strDrink}</h2>
              <h4 className="mt-4">Instrucciones</h4>
              <p>{recipeInfo.strInstructions}</p>
              <img
                src={recipeInfo.strDrinkThumb}
                alt={strDrink}
                className="img-fluid my-4"
              />

              <h4>Ingredientes y cantidades</h4>
              <ul>{showIngredients(recipeInfo)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default Recipe;
