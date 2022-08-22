import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { projectFirestore } from "../../firebase/config";

// styles //
import "./Recipe.css";

function Recipe() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const { mode } = useTheme();

  const history = useNavigate();

  useEffect(() => {
    setPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setPending(false);
          setRecipes(doc.data());
        } else {
          setPending(false);
          setError("Could not find recipe");
          setTimeout(() => {
            history("/");
          }, 3000);
        }
      });

    return () => unsub();
  }, [id, history]);

  // function to update a recipe, but is set to spaghetti for now.
  // const handleClick = () => {
  //   projectFirestore.collection("recipes").doc(id).update({
  //     title: "Spaghetti",
  //   });
  // };

  // const url = "http://localhost:3000/recipes/" + id;
  // const { data: recipes, isPending, error } = useFetch(url);

  // useEffect(() => {
  //   if (error) {
  //     //redirect

  //     setTimeout(() => {
  //       history("/");
  //     }, 2000);
  //   }
  // }, [error, history]);

  return (
		<div className={`recipe ${mode}`}>
			{error && <p className="error">{error}</p>}
			{pending && <p className="loading">Loading...</p>}
			{recipes && (
				<>
					<h2 className={`page-title ${mode}`}>{recipes.title}</h2>
					<p>{recipes.cookingTime} to cook.</p>
					<br />
					<p>Ingredients:</p>
					<ul>
						{recipes.ingredients.map((ing) => (
							<li key={ing}>{ing}</li>
						))}
					</ul>
					<p className="method">{recipes.method}</p>
					{/* <button onClick={handleClick}>Update Me</button> */}
				</>
			)}
		</div>
  );
}

export default Recipe;
