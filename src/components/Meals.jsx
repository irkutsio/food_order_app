import { useEffect, useState } from 'react';
import { useHttp } from '../hooks/useHttp';
import { MealItem } from './MealItem';
import { Error } from './Error';

const requestConfig = {};

export const Meals = () => {
	const {
		data: loadedMeals,
		error,
		isLoading,
	} = useHttp('http://localhost:3000/meals', requestConfig, []);

	// console.log(error); нет стилей у ерора

	return (
		<>
			{isLoading && <p className="center">Please, wait...</p>}
			{error && <Error title="Failed with error" message={error} />}
			<ul id="meals">
				{loadedMeals.map(meal => (
					<MealItem meal={meal} key={meal.id} />
				))}
			</ul>
		</>
	);
};
