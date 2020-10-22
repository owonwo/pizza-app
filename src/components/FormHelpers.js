import React from 'react';
import { useLayout } from '../libs/LayoutStore';

export const showErrMessageIfAny = (field, errors, options = {}) => {
	if (errors[field]) {
		return <div className="px-4 text-right text-sm">
			<span className={`${options.darkMode ? 'text-yellow-200' : 'text-red'}`}>
				{errors[field].message}
			</span>
		</div>
	}
	return null;
}

export const useErrors = (errors) => {
	const { store } = useLayout();

	return (field) => showErrMessageIfAny(field, errors, { darkMode: store.isDarkMode })
}