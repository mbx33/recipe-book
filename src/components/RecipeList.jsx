import React from "react";
import { NavLink } from "react-router-dom";
import Trashcan from "../assets/trashcan.svg";
import { projectFirestore } from "../firebase/config";

//styles
import "./RecipeList.css";

function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="error">No Recipes found...</div>;
  }

  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>
            {/* with substring method, takes 2 arguments starting position and end position, will only show the first 100 characters */}
            {recipe.method.substring(0, 100)}...
          </div>
          <NavLink to={`/recipes/${recipe.id}`}>Cook This</NavLink>
          <img
            className="delete"
            alt="trash icon"
            src={Trashcan}
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
