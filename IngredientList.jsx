import React from "react";

export default function IngredientList(props) {
    const ingredientlist = props.ingredients.map((ingredient, index) => (
        <li key={`${ingredient}-${index}`}>{ingredient}</li>
    ));

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredient-list" aria-live="polite">
                {ingredientlist}
            </ul>
            {props.ingredients.length > 3 && 
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            }
        </section>
    )
}
