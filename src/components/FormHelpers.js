import React from 'react';

export const showErrMessageIfAny = (field, errors) => {
	if (errors[field]) {
		return <div className="px-4 text-right text-red text-sm">{errors[field].message}</div>
	}
	return null;
}