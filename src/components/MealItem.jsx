import { useContext } from "react";
import { currenceFormatter } from "../util/formatting";
import { Button } from "./UI/Button";
import { CartContext } from "../store/CartContext";

export const MealItem = ({meal}) => {
	const { addItem} = useContext(CartContext)
    
     const handleAddMeal = () => {
addItem(meal)
     }

    return (
		<li className="meal-item" >
			<article>
				<img src={`http://localhost:3000/${meal.image}`} alt={name} />
				<div>
					<h3>{meal.name}</h3>
					<p className="meal-item-price">{currenceFormatter.format(meal.price)}</p>
					<p className="meal-item-description">{meal.description}</p>
				</div>
				<p className="meal-item-actions">
					<Button onClick={handleAddMeal}>Add to cart</Button>
				</p>
			</article>
		</li>
	);
};
