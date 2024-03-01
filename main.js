// Import db from server/server.js
import { db } from "./server/server.js";
import { collection, getDocs } from "firebase/firestore";
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
let totalNutritionalValues = {
    calories: 0,
    protein: 0,
    fat: 0
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

//finish the SearchBar



//added an a fake shoping list
document.getElementById("getShoppingListBtn").addEventListener("click", function() {
    // Open a new popup window
    var popupWindow = window.open("", "ShoppingListPopup", "width=400,height=400");

    // Predefined grocery list
    var groceryList = ["Apples", "Bananas", "Milk", "Bread", "Eggs", "Cheese", "Tomatoes", "Potatoes", "Chicken"];

    // Add content to the popup window (grocery list, cart, download button, and close button)
    var groceryListContainer = document.createElement("div");

    // Display the grocery list
    groceryList.forEach(function(item) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = item;
        groceryListContainer.appendChild(checkbox);

        var label = document.createElement("label");
        label.textContent = item;
        groceryListContainer.appendChild(label);

        groceryListContainer.appendChild(document.createElement("br"));
    });

    var addButton = document.createElement("button");
    addButton.innerText = "Add Selected to Shopping List";
    addButton.addEventListener("click", function() {
        // Get selected items and add them to the shopping list
        var checkboxes = groceryListContainer.querySelectorAll("input[type='checkbox']:checked");
        checkboxes.forEach(function(checkbox) {
            var newIngredient = checkbox.value;

            // Create a new list item with delete button
            var listItem = document.createElement("li");
            listItem.textContent = newIngredient;

            var deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function() {
                // Remove the list item when the delete button is clicked
                shoppingList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);

            // Append the new ingredient to the shopping list
            shoppingList.appendChild(listItem);

            // Uncheck the checkbox
            checkbox.checked = false;
        });
    });

    // Shopping list
    var shoppingList = document.createElement("ul");

    // Download button
    var downloadButton = document.createElement("button");
    downloadButton.innerText = "Download Groceries";
    downloadButton.addEventListener("click", function() {
        // Generate a text file with the selected groceries
        var selectedGroceries = Array.from(shoppingList.getElementsByTagName("li")).map(function(item) {
            // return item.textContent;
            return item.textContent.replace(/Delete/g, "");
        }).join("\n");

        var blob = new Blob([selectedGroceries], { type: "text/plain" });
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.href = url;
        a.download = "groceries.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });

    // Close button for the popup window
    var closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", function() {
        popupWindow.close();
    });

    // Append content to the popup window
    popupWindow.document.body.appendChild(groceryListContainer);
    popupWindow.document.body.appendChild(addButton);
    popupWindow.document.body.appendChild(shoppingList);
    popupWindow.document.body.appendChild(downloadButton);
    popupWindow.document.body.appendChild(closeButton);
});


// finish my fake list



///adding a new recipe - not working for now! i will fix it.



/// fix

