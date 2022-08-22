import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//page components //
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';
import NavBar from './components/NavBar';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './context/ThemeContext';

//styles
import './App.css';

function App() {
	const { mode } = useTheme();

	return (
		<div className={`App ${mode}`}>
			<Router>
				<NavBar />
				<ThemeSelector />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<Create />} />
					<Route path="/recipes/:id" element={<Recipe />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
