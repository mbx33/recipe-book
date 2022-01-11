import React, { useEffect } from "react";

import { useFetch } from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";

// styles //
import "./Recipe.css";

function Recipe() {
  const { id } = useParams();
  const url = "http://localhost:3000/recipes/" + id;
  const { data: recipes, isPending, error } = useFetch(url);
  const history = useNavigate();

  useEffect(() => {
    if (error) {
      //redirect
      // history.goBack()
      // history.push('/about')
      setTimeout(() => {
        history("/");
      }, 2000);
    }
  }, [error, history]);

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && (
        <>
          <h2 className="page-title">{recipes.title}</h2>
          <p>{recipes.cookingTime} to cook.</p>
          <br />
          <p>Ingredients:</p>
          <ul>
            {recipes.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipes.method}</p>
        </>
      )}
    </div>
  );
}

export default Recipe;
