import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../context/ThemeContext';

// styles //
import './Search.css';

// components //
import RecipeList from '../../components/RecipeList';

function Search() {
	const queryString = useLocation().search;
	const queryParams = new URLSearchParams(queryString);
	const query = queryParams.get('q');
	const { mode } = useTheme();
	const [data, setData] = useState(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);

	// const url = 'http://localhost:3000/recipes/?q=' + query;
	// const { error, isPending, data } = useFetch(url);
	//fetch data from firebase for the query params

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
						//only push recipes that include the query
						if (doc.data().title.toLowerCase().includes(query.toLowerCase()))
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
	}, [query]);

	return (
		<div className={`results ${mode}`}>
			<h2 className="page-title">Recipes Including "{query}"</h2>
			{error && <p className="error">{error}</p>}
			{pending && <p className="loading">Loading...</p>}
			{data && <RecipeList recipes={data} />}
		</div>
	);
}

export default Search;
