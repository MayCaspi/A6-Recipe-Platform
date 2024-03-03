// Import db from server/server.js
import { db } from "./server/server.js";
import { collection, getDocs } from "./firebase/firestore";
import { createNav } from "./navigationBar";
import { createSearchBar } from "./searchBar";
import { createRecipeCardOnDisplay } from './createCard';
import { createNewRecipe } from "./addRecipe";
import {createBanner} from "./banner";
import {createMealPlannerTable} from "./mealPlanner";

document.addEventListener("DOMContentLoaded",function(){
    createNav()
    createSearchBar()
    createNewRecipe()
    createBanner()
    createMealPlannerTable()
})




let recipes = [];
document.addEventListener("DOMContentLoaded", function () {
    // Load recipes from Firestore database
    const recipesCollection = collection(db, 'recipe');

    getDocs(recipesCollection)
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const recipe = doc.data(); // Get the data of the recipe document

                // Push each recipe into the recipes array
                recipes.push(recipe);
            });
            // Create recipe cards dynamically
            recipes.sort(() => Math.random() - 0.5);
            recipes.slice(0, 8).forEach(recipe => {
                createRecipeCardOnDisplay(recipe.name, recipe.image, recipe.description, recipe.ingredients, recipe.nutritionalValues, recipe.preparation);
            })
        })
        .catch(error => console.error('Error fetching recipes:', error));
});



//  adding recipe to Plan
let selectedRecipes = {
    breakfast: [],
    lunch: [],
    dinner: []
};



document.addEventListener("DOMContentLoaded", function () {
    // Add input event listener to update recipes dynamically while typing or when input is cleared
    const searchInput = document.querySelector("#searchBar input");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();

        // Filter recipes based on the search text
        const filteredRecipes = recipes.filter(recipe => {
            const lowerCaseName = recipe.name.toLowerCase();
            return lowerCaseName.includes(searchText);
        });
        // Display up to 8 recipes based on the search result or show all recipes if the search text is empty
        displayRecipes(filteredRecipes.slice(0, 8));
    });

    // Initial display of recipes when the page loads
    displayRecipes(recipes.slice(0, 8));
});

function displayRecipes(recipes) {
    // Clear existing recipe cards
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = "";

    // Create recipe cards for the filtered recipes
    recipes.forEach(recipe => {
        createRecipeCardOnDisplay(recipe.name, recipe.image, recipe.description, recipe.ingredients, recipe.nutritionalValues,recipe.preparation);
    });
}

