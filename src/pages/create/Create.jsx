import { useState, useRef } from 'react';
// import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../context/ThemeContext';

// styles //
import './Create.css';

function Create() {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setCookingTime] = useState('');
	const [newIngredient, setNewIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const ingredientInput = useRef(null);
	const history = useNavigate();
	const { mode, color } = useTheme();

	// const { postData, data, error } = useFetch(
	//   "http://localhost:3000/recipes",
	//   "POST"
	// );

	// const reset = () => {
	//   setTitle("");
	//   setMethod("");
	//   setCookingTime("");
	//   setIngredients([]);
	// };

	// redirect the user after the form is submitted //
	// useEffect(() => {
	//   if (error) {
	//     //redirect
	//     setTimeout(() => {
	//       history("/create");
	//     }, 2000);
	//   }
	//   if (data) {
	//     setTimeout(() => {
	//       history("/");
	//     }, 1000);
	//   }
	// }, [error, data, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const doc = {
			title,
			ingredients,
			method,
			cookingTime: cookingTime + ' minutes',
		};

		try {
			await projectFirestore.collection('recipes').add(doc);
			history('/');
		} catch (err) {
			console.log(err);
		}
	};

	const handleAdd = (e) => {
		e.preventDefault();
		const ing = newIngredient.trim();

		if (ing && !ingredients.includes(ing)) {
			setIngredients((prevIngredients) => [...prevIngredients, ing]);
		}
		setNewIngredient('');
		ingredientInput.current.focus();
	};

	return (
		<div className={`create ${mode}`}>
			<h2 style={{ color: color }} className="page-title">
				Add a New Recipe
			</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Recipe title:</span>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						required
					/>
				</label>

				<label>
					<span>Recipe ingredients:</span>
					<div className="ingredients">
						<input
							type="text"
							onChange={(e) => setNewIngredient(e.target.value)}
							value={newIngredient}
							ref={ingredientInput}
						/>
						<button
							onClick={handleAdd}
							className="btn"
							style={{ backgroundColor: color }}
						>
							add
						</button>
					</div>
				</label>
				<p>
					Current ingredients:{' '}
					{ingredients.map((i) => (
						<em key={i}>{i}, </em>
					))}
				</p>

				<label>
					<span>Recipe method: </span>
					<textarea
						onChange={(e) => setMethod(e.target.value)}
						value={method}
						required
					/>
				</label>

				<label>
					<span>Cooking time (minutes): </span>
					<input
						type="number"
						onChange={(e) => setCookingTime(e.target.value)}
						value={cookingTime}
						required
					/>
				</label>
				<button className="btn" style={{ backgroundColor: color }}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default Create;
