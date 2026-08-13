/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

let recipes = [];

// Wait for DOM to fully load before accessing elements
window.addEventListener("DOMContentLoaded", () => {

    /* 
     * TODO: Get references to various DOM elements
     * - Recipe name and instructions fields (add, update, delete)
     * - Recipe list container
     * - Admin link and logout button
     * - Search input
    */
    let adminLink = document.getElementById("admin-link");
    let logoutButton = document.getElementById("logout-button");
    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-button");
    let recipeList = document.getElementById("recipe-list");
    let addName = document.getElementById("add-recipe-name-input");
    let addInstructions = document.getElementById("add-recipe-instructions-input");
    let addSubmit = document.getElementById("add-recipe-submit-input");
    let updateName = document.getElementById("update-recipe-name-input");
    let updateInstructions = document.getElementById("update-recipe-instructions-input");
    let updateSubmit = document.getElementById("update-recipe-submit-input");
    let deleteName = document.getElementById("delete-recipe-name-input");
    let deleteSubmit = document.getElementById("delete-recipe-submit-input");

    /*
     * TODO: Show logout button if auth-token exists in sessionStorage
     */
    if (sessionStorage.getItem("auth-token") !== null) {
        logoutButton.hidden = false;
    }

    /*
     * TODO: Show admin link if is-admin flag in sessionStorage is "true"
     */

    if (sessionStorage.getItem("is-admin") !== null) {
        adminLink.hidden = false;
    }

    /*
     * TODO: Attach event handlers
     * - Add recipe button → addRecipe()
     * - Update recipe button → updateRecipe()
     * - Delete recipe button → deleteRecipe()
     * - Search button → searchRecipes()
     * - Logout button → processLogout()
     */
    addSubmit.addEventListener("click", addRecipe);
    updateSubmit.addEventListener("click", updateRecipe);
    deleteSubmit.addEventListener("click", deleteRecipe);
    searchButton.addEventListener("click", searchRecipes);
    logoutButton.addEventListener("click", processLogout);


    /*
     * TODO: On page load, call getRecipes() to populate the list
     */

    document.addEventListener("DOMContentLoaded", () => {
        getRecipes();
    });


    /**
     * TODO: Search Recipes Function
     * - Read search term from input field
     * - Send GET request with name query param
     * - Update the recipe list using refreshRecipeList()
     * - Handle fetch errors and alert user
     */
    async function searchRecipes() {
        let searchTerm = searchInput.value.trim();
        try {
            let response = await fetch(`${BASE_URL}/recipes?name=${encodeURIComponent(searchTerm)}`,     
                {
                    method: "GET"
                }
            );
            recipes = await response.json();
            refreshRecipeList();
        } catch(error) {
            console.log("Error Message: ", error.message);
            alert("Error Message: " + error.message);
        }
    }

    /**
     * TODO: Add Recipe Function
     * - Get values from add form inputs
     * - Validate both name and instructions
     * - Send POST request to /recipes
     * - Use Bearer token from sessionStorage
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function addRecipe() {
        // Implement add logic here
    }

    /**
     * TODO: Update Recipe Function
     * - Get values from update form inputs
     * - Validate both name and updated instructions
     * - Fetch current recipes to locate the recipe by name
     * - Send PUT request to update it by ID
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function updateRecipe() {
        // Implement update logic here
    }

    /**
     * TODO: Delete Recipe Function
     * - Get recipe name from delete input
     * - Find matching recipe in list to get its ID
     * - Send DELETE request using recipe ID
     * - On success: refresh the list
     */
    async function deleteRecipe() {
        // Implement delete logic here
    }

    /**
     * TODO: Get Recipes Function
     * - Fetch all recipes from backend
     * - Store in recipes array
     * - Call refreshRecipeList() to display
     */
    async function getRecipes() {
        // Implement get logic here
    }

    /**
     * TODO: Refresh Recipe List Function
     * - Clear current list in DOM
     * - Create <li> elements for each recipe with name + instructions
     * - Append to list container
     */
    function refreshRecipeList() {
        // Implement refresh logic here
    }

    /**
     * TODO: Logout Function
     * - Send POST request to /logout
     * - Use Bearer token from sessionStorage
     * - On success: clear sessionStorage and redirect to login
     * - On failure: alert the user
     */
    async function processLogout() {
        // Implement logout logic here
        const token = sessionStorage.getItem("auth-token");
        try {
            let response = await fetch(`${BASE_URL}/logout`,     
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                sessionStorage.clear();
                window.location.href = "login-page.html";
            } else {
                throw new Error("Logout unsuccessful.");
            }
        } catch(error) {
            console.log(error.message);
            alert("Error Message: " + error.message);
        }
    }

});
