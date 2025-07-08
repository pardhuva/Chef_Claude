import React from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientList from "./IngredientList.jsx";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [recipe, setRecipe] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    async function getRecipe() {
        try {
            setIsLoading(true);
            setError(null);
            const recipeMarkdown = await getRecipeFromMistral(ingredients);
            setRecipe(recipeMarkdown);
        } catch (err) {
            setError("Failed to fetch recipe. Please check your HuggingFace API key.");
            console.error("Recipe fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    function addingredient(formData) {
        if (inputValue.trim() === "") return;
        const newingredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newingredient]);
        setInputValue("");
    }

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <main>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addingredient(formData);
            }} className="add-ingredient">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient" 
                    name="ingredient"
                    value={inputValue}
                    onChange={handleChange}
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 && 
                <IngredientList 
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {isLoading && <p>Loading recipe...</p>}
            {error && <p className="error">{error}</p>}
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}
