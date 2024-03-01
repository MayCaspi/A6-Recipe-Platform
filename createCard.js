export function createRecipeCardOnDisplay(title, imageSrc, description, ingredients, nutritionalValues,preparation, openPopup, openModal) {
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.classList.add('grid', 'grid-cols-4', 'gap-8', 'p-20');
    const recipeCard = document.createElement("div");
    recipeCard.className = "bg-white p-4 rounded-lg shadow-md hover:scale-110 transition duration-500 recipe-card";

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = title;
    img.className = "w-full h-64 object-cover rounded-md mb-4";

    img.addEventListener("click", function () {
        openPopup(title, imageSrc, description, ingredients, nutritionalValues, preparation);
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

    addButton.addEventListener("click", function () {
        openModal(title, ingredients, nutritionalValues);
    });

    recipeCard.appendChild(img);
    recipeCard.appendChild(titleElement);
    recipeCard.appendChild(descriptionElement);
    recipeCard.appendChild(addButton);

    recipeContainer.appendChild(recipeCard);


    let currentPopupImg = null;
function openPopup(title, imageSrc, description, ingredients, nutritionalValues, preparation) {
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
        "p-4", // Increased padding for more internal space
        "rounded-md",
        "shadow-md",
        "z-50",
        "text-center",
        "max-w-l", // Increased max width to medium
        "max-h-[32]", // Increased max height
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
    popupImg.classList.add("w-full", "h-40", "object-cover", "rounded-md", "mb-2");

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
    const desiredOrder = ["fat", "proteins", "calories"];

// Sort the keys based on the desired order
    const sortedKeys = Object.keys(nutritionalValues).sort((a, b) =>
    desiredOrder.indexOf(a) - desiredOrder.indexOf(b)
    );

    // Iterate over the sorted keys
    for (const key of sortedKeys) {
        const value = nutritionalValues[key];
        const listItem = document.createElement("li");
        const unit = (key === "fat" || key === "proteins") ? 'g' : '';
        listItem.textContent = `${key}: ${value}${unit}`;
        nutritionalValuesList.appendChild(listItem);
    }
    nutritionalValuesElement.appendChild(nutritionalValuesList);

    const preparationElement = document.createElement("div");
    preparationElement.classList.add("text-left", "mb-4");
    const preparationTitle = document.createElement("h3");
    preparationTitle.textContent = "Preparation";
    preparationTitle.classList.add("text-gray-800", "text-md", "font-semibold", "mb-2");
    preparationElement.appendChild(preparationTitle);
    const preparationList = document.createElement("pre");
    preparationList.textContent = preparation;
    preparationList.style.maxWidth = "100%"; // Ensure the list respects the max width
    preparationList.style.overflowX = "auto"; // Add horizontal scrollbar if content overflows
    preparationElement.appendChild(preparationList);


    popup.appendChild(closeBtn);
    popup.appendChild(popupImg);
    popup.appendChild(popupTitle);
    popup.appendChild(popupDescription);
    popup.appendChild(ingredientsElement);
    popup.appendChild(nutritionalValuesElement);
    popup.appendChild(preparationElement);

    document.body.appendChild(popup);

    // Store the current popup image for comparison
    currentPopupImg = imageSrc;
}

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

// Function to close the modal
    function closeModal() {
        const modalContainer = document.getElementById("modalContainer");
        modalContainer.innerHTML = ''; // Clear modal content
    }
}

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
}