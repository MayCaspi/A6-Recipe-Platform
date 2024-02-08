document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnTheme").addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");
        document.getElementById("btnTheme").innerText = document.documentElement
            .classList.contains("dark") ? "light" : "dark"
    })
    document.getElementById("btnMenu").addEventListener("click", function () {
        document.getElementById("popUp").classList.toggle("hidden")
    })
})



// add eventer for the meal planner fast view
document.addEventListener("DOMContentLoaded", function () {
    var mealPlanDetails = document.getElementById('mealPlanSideBar');
    var closeSideBarBtn = document.getElementById('closeSideBar');
  
    document.getElementById("clickForSideBar").addEventListener("click", function () {
      mealPlanDetails.classList.toggle('hidden');
    });
  
    closeSideBarBtn.addEventListener("click", function () {
      mealPlanDetails.classList.add('hidden');
    });
  });




let recipes = [];
//  ---import fake data from json
document.addEventListener("DOMContentLoaded", function () {
 // Load recipes from JSON file
 fetch('rcipesInfo.json')
 .then(response => response.json())
 .then(data => {
    recipes = data;
     // Create recipe cards dynamically
     recipes.slice(0, 8).forEach(recipe => {
        createRecipeCardOnDisplay(recipe.name, recipe.image, recipe.description,recipe.ingredients, recipe.nutritionalValues);
     });
 })
 .catch(error => console.error('Error fetching recipes:', error));
});

//create the recipes cards for the display
function createRecipeCardOnDisplay(title, imageSrc, description, ingredients, nutritionalValues) {
    const recipeContainer = document.getElementById("recipeContainer");

    const recipeCard = document.createElement("div");
    recipeCard.className = "bg-white p-4 rounded-lg shadow-md hover:scale-110 transition duration-500 recipe-card";

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = title;
    img.className = "w-full h-64 object-cover rounded-md mb-4";

    img.addEventListener("click", function () {
        // Include the call to openPopup with necessary arguments
        openPopup(title, imageSrc, description, ingredients, nutritionalValues);
    });

    const titleElement = document.createElement("div");
    titleElement.className = "text-center text-lg font-semibold title";
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.className = "text-gray-600 text-s description";
    descriptionElement.textContent = description;

    const addButton = document.createElement("button");
    addButton.className = "add-to-planner-btn text-green-500 py-1 px-2 mt-1 text-xs border border-green-500 px-3 rounded-full w-full max-w-full text-ellipsis whitespace-no-wrap";
    addButton.textContent = "+ Add to Planner";
    addButton.onclick =

    //firt try to implement the 
    addButton.addEventListener("click", function () {
        // Include the call to openModal with necessary arguments
        openModal(title, ingredients, nutritionalValues);
    });  //end of it for now.

    recipeCard.appendChild(img);
    recipeCard.appendChild(titleElement);
    recipeCard.appendChild(descriptionElement);
    recipeCard.appendChild(addButton);

    recipeContainer.appendChild(recipeCard);
}

// finish the importing


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


  // Function to open meal selection modal
  function openModal(title, ingredients, nutritionalValues) {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.innerHTML = ''; // Clear previous content

    const modal = document.createElement("div");
    modal.className = "modal bg-white w-44 p-4 rounded-lg shadow-md fixed top-1/2 left-0";

    const closeButton = document.createElement("button");
    closeButton.className = "close-modal-btn absolute top-2 left-2 c text-black";
    closeButton.innerHTML = "x"; // 'x' character
    closeButton.addEventListener("click", closeModal);

    const modalTitle = document.createElement("div");
    modalTitle.className = "text-center text-lg font-semibold title mb-2 top";
    modalTitle.textContent = `Add ${title} to:`;

    modal.appendChild(modalTitle);

    const mealOptions = ["breakfast", "lunch", "dinner"];
    mealOptions.forEach(meal => {
        const optionButton = document.createElement("button");
        optionButton.className = "meal-option-btn text-blue-500 py-1 px-2 mt-1 text-xs border border-blue-500 px-3 rounded-full w-full max-w-full text-ellipsis whitespace-no-wrap";
        optionButton.textContent = meal.charAt(0).toUpperCase() + meal.slice(1); // Capitalize first letter
        optionButton.addEventListener("click", function () {
            addToPlanner(meal, title, ingredients, nutritionalValues);
            closeModal();
        });
        modal.appendChild(optionButton);
    });

    modal.appendChild(closeButton);
    modalContainer.appendChild(modal);


// Function to add recipe to the planner and update total nutritional values
function addToPlanner(meal, title, ingredients, nutritionalValues) {
    selectedRecipes[meal].push({ title, ingredients, nutritionalValues });
    updateTotalNutritionalValues(nutritionalValues);

    console.log(`Added '${title}' to ${meal}`);
}

// Function to update total nutritional values
function updateTotalNutritionalValues(newValues) {
    totalNutritionalValues.calories += newValues.calories;
    totalNutritionalValues.protein += newValues.proteins;
    totalNutritionalValues.fat += newValues.fat;
    console.log("Updated total nutritional values:", totalNutritionalValues);
}

// Function to close the modal
function closeModal() {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.innerHTML = ''; // Clear modal content
}


}



//  finish first try


//popup for recepies
let currentPopupImg = null;
function openPopup(title, imageSrc, description, ingredients, nutritionalValues) {
    // Check if there's already an open popup
    const existingPopup = document.querySelector(".popup");

    // If there is, remove it
    if (existingPopup) {
        document.body.removeChild(existingPopup);
        if (currentPopupImg === imageSrc) {
            currentPopupImg = null; // Reset currentPopupImg when closing
            return; // Return to prevent creating a new popup
        }
    }

    // Create and customize the popup elements
    const popup = document.createElement("div");
    popup.classList.add(
        "fixed",
        "top-1/2",
        "left-1/2",
        "transform",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "bg-white",
        "p-4", 
        "rounded-md",
        "shadow-md",
        "z-50",
        "text-center",
        "max-w-sm", // Reduced max width
        "popup" // Add a class to identify the popup
    );

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = '<span class="text-stone-900 font-extrabold text-2xl bg-slate-200 rounded cursor-pointer">&times;</span>'; // Larger 'x' character for close
    closeBtn.classList.add("absolute", "top-2", "left-2");

    closeBtn.addEventListener("click", function () {
        document.body.removeChild(popup);
        currentPopupImg = null; // Reset currentPopupImg when closing
    });

    const popupImg = document.createElement("img");
    popupImg.src = imageSrc;
    popupImg.alt = title;
    popupImg.classList.add("w-full", "h-64", "object-cover", "rounded-md", "mb-4");

    const popupTitle = document.createElement("h2");
    popupTitle.textContent = title;
    popupTitle.classList.add("text-lg", "font-semibold", "mb-4");

    const popupDescription = document.createElement("p");
    popupDescription.textContent = description;
    popupDescription.classList.add("text-gray-600", "text-sm", "mb-4");

    const ingredientsElement = document.createElement("div");
    ingredientsElement.classList.add("text-left", "mb-4");
    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.textContent = "Ingredients";
    ingredientsTitle.classList.add("text-gray-800", "text-md", "font-semibold", "mb-2");
    ingredientsElement.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement("p");
    ingredientsList.textContent = ingredients.join(', '); // Join ingredients with a comma
    ingredientsElement.appendChild(ingredientsList);

    const nutritionalValuesElement = document.createElement("div");
    nutritionalValuesElement.classList.add("text-left", "mb-4");
    const nutritionalValuesTitle = document.createElement("h3");
    nutritionalValuesTitle.textContent = "Nutritional Values";
    nutritionalValuesTitle.classList.add("text-gray-800", "text-md", "font-semibold", "mb-2");
    nutritionalValuesElement.appendChild(nutritionalValuesTitle);

    const nutritionalValuesList = document.createElement("ul");
    for (const [key, value] of Object.entries(nutritionalValues)) {
        const listItem = document.createElement("li");
        const unit = (key === "fat" || key === "proteins") ? 'g' : '';
        listItem.textContent = `${key}: ${value}${unit}`;
        nutritionalValuesList.appendChild(listItem);
    }
    nutritionalValuesElement.appendChild(nutritionalValuesList);

    popup.appendChild(closeBtn);
    popup.appendChild(popupImg);
    popup.appendChild(popupTitle);
    popup.appendChild(popupDescription);
    popup.appendChild(ingredientsElement);
    popup.appendChild(nutritionalValuesElement);

    document.body.appendChild(popup);

    // Store the current popup image for comparison
    currentPopupImg = imageSrc;
}
// finish the popup












// try to make the SearchBar works
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
        createRecipeCardOnDisplay(recipe.name, recipe.image, recipe.description, recipe.ingredients, recipe.nutritionalValues);
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
    fetch("/rcipesInfo.json", {
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
}
/// i have to fix it!!!!!!!!!!!!!!!


// window.addEventListener('scroll', highlightMenu);