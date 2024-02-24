// Import db from server/server.js
import { db } from "./server/server.js";
import { collection, getDocs } from "firebase/firestore";
import { createNav } from "./navigationBar";
import { createSearchBar } from "./searchBar";
<<<<<<< HEAD
import { createRecipeCardOnDisplay } from './createCard';
import { createNewRecipe } from "./addRecipe";
import {createBanner} from "./banner";
import {createMealPlannerTable} from "./mealPlanner";
=======
import { createNewRecipe } from "./addRecipe";
import {createMealPlannerTable} from "./mealPlanner";
// import {createQuickViewMealPlan}from "./quickViewSideBar";

>>>>>>> 4e41562 (splitted html to js files)

document.addEventListener("DOMContentLoaded",function(){
    createNav()
    createSearchBar()
    createNewRecipe()
<<<<<<< HEAD
    createBanner()
    createMealPlannerTable()
=======
    createMealPlannerTable()
    // createQuickViewMealPlan()
>>>>>>> 4e41562 (splitted html to js files)
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
<<<<<<< HEAD
=======

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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitRecipeBtn").addEventListener("click", function () {
        // Call the function to handle the recipe submission
        submitRecipe();
    });
});

function submitRecipe() {
    // Get values from input fields
    const recipeName = document.getElementById("NameNewRecipe").value.trim();
    const ingredients = document.getElementById("IngredientsNewRecipe").value.trim().split('\n');
    const calories = document.getElementById("newCal").value.trim();
    const fat = document.getElementById("newFat").value.trim();
    const protein = document.getElementById("newProtein").value.trim(); // Updated id
    // const carbs = document.getElementById("newCarbs").value.trim();


    // Validate input data (add your own validation logic)
    if (!recipeName || !ingredients || !calories || !fat || !protein) {
        alert("Please fill in all the required fields.");
        return;
    }

    // Get the selected file from the file input
    const fileInput = document.getElementById("recipeImage");
    const file = fileInput.files[0];

    // Validate if a file is selected
    if (!file) {
        alert("Please select a recipe image.");
        return;
    }

    // Create a FormData object to append the file data
    const formData = new FormData();
    formData.append("recipeImage", file, file.name);

    // Upload the file to the "pictures/" folder
    fetch("/recipesInfo.json", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server if needed
        console.log("Image uploaded successfully:", data);

        // Create a new recipe object
        const newRecipe = {
            name: recipeName,
            ingredients: ingredients,
            nutritionalValues: {
                calories: calories,
                fat: fat,
                protein: protein,
            },
            image: "/pictures/" + file.name, // Update with the correct path
        };

        // Add the new recipe to the recipes array (assuming 'recipes' is a global variable)
        recipes.push(newRecipe);

        // Display the new recipe on the page
        createRecipeCardOnDisplay(newRecipe.name, newRecipe.image, /* add other properties as needed */);

        // Optional: You can save the updated recipes array to a server or local storage

        // Clear input fields
        document.getElementById("NameNewRecipe").value = "";
        document.getElementById("IngredientsNewRecipe").value = "";
        document.getElementById("newCal").value = "";
        document.getElementById("newFat").value = "";
        document.getElementById("newProtein").value = "";
        alert("Recipe submitted successfully!");
    })
    .catch(error => console.error("Error uploading image:", error));
>>>>>>> 4e41562 (splitted html to js files)
}

