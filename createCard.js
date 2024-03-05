import { openModal } from "./mealPlanner.js";

export function createRecipeCardOnDisplay(title, imageSrc, description, ingredients, nutritionalValues, preparation, openPopup) {
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.classList.add('grid', 'grid-cols-1', 'p-6', 'md:grid-cols-4', 'md:gap-8');

    const recipeCard = document.createElement("div");
    recipeCard.className = "bg-white rounded-lg shadow-md hover:scale-110 transition duration-500 recipe-card";

    const contentContainer = document.createElement("div");
    contentContainer.className = "p-4 flex flex-col";

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = title;
    img.className = "w-full h-64 object-cover rounded-md mb-4";

    img.addEventListener("click", function () {
        openPopup(title, imageSrc, description, ingredients, nutritionalValues, preparation);
    });

    const titleElement = document.createElement("div");
    titleElement.className = "text-center text-lg font-semibold title mb-4";
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.className = "text-gray-600 text-s description flex-grow";
    descriptionElement.textContent = description;

    const addButton = document.createElement("button");
    addButton.className = "add-to-planner-btn text-green-500 py-1 px-2 mt-4 text-xs border border-green-500 rounded-full w-full self-end";
    addButton.textContent = "+ Add to Planner";
    addButton.addEventListener("click", function () {
        openModal(title, ingredients, nutritionalValues);
    });

    contentContainer.appendChild(img);
    contentContainer.appendChild(titleElement);
    contentContainer.appendChild(descriptionElement);
    recipeCard.appendChild(contentContainer);
    recipeCard.appendChild(addButton);

    recipeContainer.appendChild(recipeCard);

    let currentPopupImg = null;
    function openPopup(title, imageSrc, description, ingredients, nutritionalValues, preparation) {    // Check if there's already an open popup
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
            "shadow-lg",
            "z-50",
            "text-center",
            "w-11/12",
            "max-w-md",
            "mx-auto", // Center the popup horizontally
            "sm:w-4/5", // 80% width on small screens
            "md:w-2/3", // 66% width on medium screens
            "lg:w-1/2", // 50% width on large screens
            "xl:w-1/3", // 33% width on extra-large screens
            "max-h-[28]",
            "popup"
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
        popupImg.classList.add("w-full", "h-48", "object-cover", "rounded-lg", "mb-1");

        const popupTitle = document.createElement("h2");
        popupTitle.textContent = title;
        popupTitle.classList.add("text-lg", "font-semibold", "mb-1");

        const popupDescription = document.createElement("p");
        popupDescription.textContent = description;
        popupDescription.classList.add("text-gray-600", "font-normal", "mb-1");

        const ingredientsElement = document.createElement("div");
        ingredientsElement.classList.add("text-left", "mb-2");
        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.textContent = "Ingredients";
        ingredientsTitle.classList.add("text-gray-800", "text-md", "font-semibold");
        ingredientsElement.appendChild(ingredientsTitle);

        const ingredientsList = document.createElement("p");
        ingredientsList.textContent = ingredients.join(', '); // Join ingredients with a comma
        ingredientsElement.appendChild(ingredientsList);

        const nutritionalValuesElement = document.createElement("div");
        nutritionalValuesElement.classList.add("text-left", "mb-2");
        const nutritionalValuesTitle = document.createElement("h3");
        nutritionalValuesTitle.textContent = "Nutritional Values";
        nutritionalValuesTitle.classList.add("text-gray-800", "text-md", "font-semibold");
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
        preparationTitle.classList.add("text-gray-800", "text-md", "font-semibold", "mb-1");
        preparationElement.appendChild(preparationTitle);
        const preparationList = document.createElement("pre");
        preparationList.textContent = preparation;
        preparationList.style.maxWidth = "100%";
        preparationList.style.overflowX = "auto";
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



}