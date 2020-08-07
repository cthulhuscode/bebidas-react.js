import React from "react";

// Context
import CategoriesProvider from "./context/CategoriesContext";
import RecipesProvider from "./context/RecipesContext";
import ModalProvider from "./context/ModalContext";

// Components
import Header from "./components/Header";
import Form from "./components/Form";
import RecipesList from "./components/RecipesList";

function App() {
  return (
    <CategoriesProvider>
      <RecipesProvider>
        <ModalProvider>
          <Header />
          <div className="container pl-5 pt-4 m-0">
            <div className="row">
              <Form />
            </div>
            <RecipesList />
          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoriesProvider>
  );
}

export default App;
