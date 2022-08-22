import React, { useEffect, useState } from 'react';
import './Home.css';
import { projectFirestore } from '../../firebase/config';

// import { useFetch } from "../../hooks/useFetch";

//  components
import RecipeList from '../../components/RecipeList';

function Home() {
	//this hook was used before setting up firestore & using local data json.db//
	// const { data, isPending, error } = useFetch("http://localhost:3000/recipes");
	const [data, setData] = useState(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setPending(true);

		const unsub = projectFirestore.collection('recipes').onSnapshot(
			(snapshot) => {
				if (snapshot.empty) {
					setError('No recipes found');
					setPending(false);
				} else {
					let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ id: doc.id, ...doc.data() });
					});
					setData(results);
					setPending(false);
				}
			},
			(err) => {
				setError(err.message);
				setPending(false);
			}
		);

		//cleanup function
		return () => unsub();
	}, []);

	return (
		<div className="home">
			{error && <p className="error">{error}</p>}
			{pending && <p className="loading">Loading Recipes...</p>}
			{data && <RecipeList recipes={data} />}
		</div>
	);
}

export default Home;
