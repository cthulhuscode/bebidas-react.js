import React, { useContext, useState } from "react";

// Context
import { CategoriesContext } from "../context/CategoriesContext";
import { RecipesContext } from "../context/RecipesContext";

const Form = () => {
  // State
  const [searchForm, setSearchForm] = useState({
    ingredient: "",
    category: "",
  });
  const [error, setError] = useState(false);

  // useContext
  const { categories } = useContext(CategoriesContext);
  const { setSearch, setDoQuery } = useContext(RecipesContext);

  // On Input Change
  const onInputChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { ingredient, category } = searchForm;

    if (ingredient.trim() === "" && category.trim() === "") {
      setError(true);
      return null;
    }
    setError(false);

    setDoQuery(true);
    setSearch(searchForm);
  };

  return (
    <form className="col-12" onSubmit={handleSubmit}>
      <fieldset className="text-center">
        <legend className="h2 text-left mb-4 p-0 border-bottom">
          Búsqueda de bebidas
        </legend>
        <div className="row">
          <div className="col-md-4">
            {error ? (
              <span className="badge badge-primary text-left">
                Seleccione al menos una opción
              </span>
            ) : null}

            <h5 className="text-left lead mb-1 p-0">Ingrediente</h5>
            <input
              name="ingredient"
              type="text"
              className="form-control"
              placeholder="Buscar ingrediente"
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-4">
            <h5 className="text-left lead mb-1 p-0"> Categoría</h5>
            <select
              id=""
              className="form-control"
              name="category"
              onChange={onInputChange}
            >
              <option value="">-- Selecciona categoría --</option>
              {categories.map((category) => (
                <option key={category.strCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 pt-4">
            <input
              type="submit"
              value="Buscar"
              className="btn btn-block btn-dark text-white"
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default Form;
