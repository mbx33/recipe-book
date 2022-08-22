import React, { useContext, createContext, useReducer } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
	return useContext(ThemeContext);
};

const themeReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_COLOR':
			return {
				...state,
				color: action.payload,
			};
		case 'CHANGE_MODE':
			return {
				...state,
				mode: action.payload,
			};
		default:
			return state;
	}
};

export const ThemeProvider = ({ children }) => {
	if (ThemeContext === undefined) {
		throw new Error('useTheme() must be used inside a themeProvider');
	}

	const [state, dispatch] = useReducer(themeReducer, {
		color: '#58249c',
		mode: 'dark',
	});

	const changeColor = (color) => {
		dispatch({ type: 'CHANGE_COLOR', payload: color });
	};
	const changeMode = (mode) => {
		dispatch({ type: 'CHANGE_MODE', payload: mode });
	};

	return (
		<ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
