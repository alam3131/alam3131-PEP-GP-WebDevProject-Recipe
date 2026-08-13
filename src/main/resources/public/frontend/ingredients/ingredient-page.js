/**
 * This script defines the add, view, and delete operations for Ingredient objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

/*
* TODO: Create an array to keep track of ingredients
*/
let ingredients = [];

window.addEventListener("DOMContentLoaded", () => {
    /* 
    * TODO: Get references to various DOM elements
    * - addIngredientNameInput
    * - deleteIngredientNameInput
    * - ingredientListContainer
    * - searchInput (optional for future use)
    * - adminLink (if visible conditionally)
    */
    let addIngredientNameInput = document.getElementById("add-ingredient-name-input");
    let addIngredientSubmitButton = document.getElementById("add-ingredient-submit-button");
    let deleteIngredientNameInput = document.getElementById("delete-ingredient-name-input");
    let deleteIngredientSubmitButton = document.getElementById("delete-ingredient-submit-button");
    let ingredientListContainer = document.getElementById("ingredient-list");

    /* 
    * TODO: Attach 'onclick' events to:
    * - "add-ingredient-submit-button" → addIngredient()
    * - "delete-ingredient-submit-button" → deleteIngredient()
    */
    addIngredientSubmitButton.addEventListener('click', addIngredient);
    deleteIngredientSubmitButton.addEventListener('click', deleteIngredient);

    /* 
    * TODO: On page load, call getIngredients()
    */
    getIngredients();

    /**
     * TODO: Add Ingredient Function
     * 
     * Requirements:
     * - Read and trim value from addIngredientNameInput
     * - Validate input is not empty
     * - Send POST request to /ingredients
     * - Include Authorization token from sessionStorage
     * - On success: clear input, call getIngredients() and refreshIngredientList()
     * - On failure: alert the user
     */
    async function addIngredient() {
        // Implement add ingredient logic here
        const token = sessionStorage.getItem("auth-token");
        const ingredientName = addIngredientNameInput.value.trim();
    
        if (ingredientName === "") {
            alert("Please enter an ingredient name.");
            return;
        }
    
        const ingredientBody = {
            name: ingredientName
        };
    
        try {
            const response = await fetch(`${BASE_URL}/ingredients`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ingredientBody)
            });
    
            if (response.status === 201) {
                addIngredientNameInput.value = "";
                await getIngredients();
            } else {
                throw new Error("Add ingredient unsuccessful.");
            }
        } catch (error) {
            console.log(error.message);
            alert("Error Message: " + error.message);
        }
    }


    /**
     * TODO: Get Ingredients Function
     * 
     * Requirements:
     * - Fetch all ingredients from backend
     * - Store result in `ingredients` array
     * - Call refreshIngredientList() to display them
     * - On error: alert the user
     */
    async function getIngredients() {
        // Implement get ingredients logic here
        try {
            const response = await fetch(`${BASE_URL}/ingredients`, {
                method: "GET"
            });
    
            if (response.status === 200) {
                ingredients = await response.json();
                refreshIngredientList();
            } else {
                throw new Error("Ingredient fetch unsuccessful.");
            }
        } catch (error) {
            console.log(error.message);
            alert("Error Message: " + error.message);
        }
    }


    /**
     * TODO: Delete Ingredient Function
     * 
     * Requirements:
     * - Read and trim value from deleteIngredientNameInput
     * - Search ingredientListContainer's <li> elements for matching name
     * - Determine ID based on index (or other backend logic)
     * - Send DELETE request to /ingredients/{id}
     * - On success: call getIngredients() and refreshIngredientList(), clear input
     * - On failure or not found: alert the user
     */
    async function deleteIngredient() {
        // Implement delete ingredient logic here
        const token = sessionStorage.getItem("auth-token");
        const ingredientName = deleteIngredientNameInput.value.trim();
    
        if (ingredientName === "") {
            alert("Please enter an ingredient name.");
            return;
        }
    
        try {
            const ingredient = ingredients.find(
                ingredient => ingredient.name === ingredientName
            );
    
            if (!ingredient) {
                throw new Error("Ingredient not found.");
            }
    
            const response = await fetch(
                `${BASE_URL}/ingredients/${ingredient.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
    
            if (response.status === 200) {
                deleteIngredientNameInput.value = "";
                await getIngredients();
            } else {
                throw new Error("Delete ingredient unsuccessful.");
            }
        } catch (error) {
            console.log(error.message);
            alert("Error Message: " + error.message);
        }
    }


    /**
     * TODO: Refresh Ingredient List Function
     * 
     * Requirements:
     * - Clear ingredientListContainer
     * - Loop through `ingredients` array
     * - For each ingredient:
     *   - Create <li> and inner <p> with ingredient name
     *   - Append to container
     */
    function refreshIngredientList() {
        // Implement ingredient list rendering logic here
        ingredientListContainer.replaceChildren();

        for (let ingredient of ingredients) {
            const li = document.createElement("li");
            const p = document.createElement("p");
    
            p.textContent = ingredient.name;
    
            li.append(p);
            ingredientListContainer.append(li);
        }
    }
});
