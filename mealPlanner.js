import { createShoppingCart } from "./shoppingCart";

let totalNutritionalValues = {
    calories: 0,
    protein: 0,
    fat: 0
};
let selectedRecipes = {
    breakfast: [],
    lunch: [],
    dinner: []
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
    createMealPlannerTable();
}

function updateTotalNutritionalValues(newValues) {
    totalNutritionalValues.calories += newValues.calories;
    totalNutritionalValues.protein += newValues.proteins;
    totalNutritionalValues.fat += newValues.fat;
    console.log("Updated total nutritional values:", totalNutritionalValues);
}
function removeTotalNutritionalValues(removedValues) {
    // Subtract the nutritional values of the removed recipe from the total
    totalNutritionalValues.calories -= removedValues.calories;
    totalNutritionalValues.protein -= removedValues.proteins; // Ensure this matches the property name
    totalNutritionalValues.fat -= removedValues.fat;

    console.log("Updated total nutritional values:", totalNutritionalValues);
}


function createMealPlannerTable() {
    const mealPlannerContainer = document.getElementById('mealPlanner');
    mealPlannerContainer.innerHTML = ''; // Clear any existing content
    mealPlannerContainer.classList.add('text-xl', 'font-bold', 'px-2');
    const mealPlannerDiv = document.createElement('div');
    mealPlannerDiv.classList.add('text-xl', 'font-bold', 'px-2');

    // Create and append the inner HTML
    const plannerHeader = document.createElement('div');
    plannerHeader.classList.add('text-2xl', 'font-bold','text-center','py-3','bigTitle');
    plannerHeader.textContent = 'Plan your meals for the day';
    mealPlannerDiv.appendChild(plannerHeader);

    const table = document.createElement('table');
    table.classList.add('w-full', 'border', 'border-gray-300', 'rounded', 'shadow-md');

    // Table Head
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const tableHeadColumns = ['Meal', 'Recipe', 'Ingredients', 'Calories', 'Proteins', 'Fats', 'Actions'];

    tableHeadColumns.forEach(columnText => {
        const column = document.createElement('th');
        column.classList.add('py-2', 'px-4', 'text-left', 'bg-gray-100');
        column.textContent = columnText;
        tableHeadRow.appendChild(column);
    });

    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);

    // Table Body
    const tableBody = document.createElement('tbody');
    // Use the selectedRecipes object to create the table rows
    Object.entries(selectedRecipes).forEach(([mealTime, recipes]) => {
        recipes.forEach((recipe, index) => {
            const row = document.createElement('tr');
    
            // Helper function to create a table cell (td) with modified style
            function createStyledCell(textContent) {
                const cell = document.createElement('td');
                cell.textContent = textContent;
                cell.style.fontSize = '0.960rem'; // Smaller font size
                cell.style.fontWeight = 'normal'; // Remove bold
                cell.classList.add('py-2', 'px-4'); // Adjust padding if necessary
                return cell;
            }
            function createStyledCellforNutritionalValues(textContent, unit = '', alignment = 'left') {
                const cell = document.createElement('td');
                cell.textContent = `${textContent}${unit}`; // Append unit if provided
                cell.style.fontSize = '0.875rem'; // Smaller font size
                cell.style.fontWeight = 'normal'; // Remove bold
                cell.classList.add('py-2', 'px-4'); // Adjust padding if necessary
                cell.style.textAlign = alignment; // Set text alignment
                return cell;
            }
            
    
            const mealCell = createStyledCell(index === 0 ? mealTime.charAt(0).toUpperCase() + mealTime.slice(1) : '');
            row.appendChild(mealCell);
            const recipeCell = createStyledCell(recipe.title);
            row.appendChild(recipeCell);
    
            const ingredientsCell = createStyledCell(recipe.ingredients.join(', '));
            row.appendChild(ingredientsCell);
    
            // Then, when creating calories, proteins, and fats cells:
            const caloriesCell = createStyledCellforNutritionalValues(recipe.nutritionalValues.calories, '', 'center'); // No 'g' for calories, centered
            row.appendChild(caloriesCell);

            const proteinsCell = createStyledCellforNutritionalValues(recipe.nutritionalValues.proteins, 'g', 'center'); // Append 'g' and center
            row.appendChild(proteinsCell);

            const fatsCell = createStyledCellforNutritionalValues(recipe.nutritionalValues.fat, 'g', 'center'); // Append 'g' and center
            row.appendChild(fatsCell);
                
            // Delete button cell (keep it styled as is for visibility)
            const deleteButtonCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.classList.add('bg-green-700', 'text-white', 'px-2', 'py-1', 'rounded','text-sl', 'font-semibold');
            deleteButton.onclick = () => {
                const removedRecipeNutritionalValues = selectedRecipes[mealTime][index].nutritionalValues;
                // Handle the removal of the recipe from the planner
                selectedRecipes[mealTime] = selectedRecipes[mealTime].filter((_, recipeIndex) => recipeIndex !== index);
                removeTotalNutritionalValues(removedRecipeNutritionalValues);
                createMealPlannerTable(); // Refresh the table
            };
            deleteButtonCell.appendChild(deleteButton);
            row.appendChild(deleteButtonCell);
    
            tableBody.appendChild(row);
        });
    });

    table.appendChild(tableBody);
    mealPlannerDiv.appendChild(table);
    table.appendChild(tableBody);

    // Calculate totalNutritionalValues based on selectedRecipes...

    // Append a row for totals to the tableBody
    const totalsRow = document.createElement('tr');
    totalsRow.classList.add('bg-gray-200'); // Optional: a background color for the totals row for better distinction

    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'Total';
    totalLabelCell.colSpan = "3"; // Adjust the colspan as needed to align with your table's structure
    totalLabelCell.classList.add('font-bold', 'text-xl', 'py-2', 'px-4');
    totalsRow.appendChild(totalLabelCell);

    // empty cells if necessary, depending on your table's structure
    // Example: If you have more columns before the nutritional values, append empty cells with colspan

    const totalCaloriesCell = document.createElement('td');
    totalCaloriesCell.textContent = `${totalNutritionalValues.calories}`;
    totalCaloriesCell.classList.add('text-center');
    totalsRow.appendChild(totalCaloriesCell);

    const totalProteinCell = document.createElement('td');
    totalProteinCell.textContent = `${totalNutritionalValues.protein}g`;
    totalProteinCell.classList.add('text-center');
    totalsRow.appendChild(totalProteinCell);

    const totalFatCell = document.createElement('td');
    totalFatCell.textContent = `${totalNutritionalValues.fat}g`;
    totalFatCell.classList.add('text-center');
    totalsRow.appendChild(totalFatCell);

    // Optionally, add an empty cell if you have an "Actions" column to keep the layout consistent
   // Assuming the totalsRow and tableBody setup is already done

    // Create an empty cell for the shopping cart button, if you haven't added one already
    const emptyActionCell = document.createElement('td');

    // Create the button for the shopping cart
    const shoppingCartButton = document.createElement('button');
    shoppingCartButton.classList.add('flex', 'justify-center', 'items-center', 'px-8', 'py-1'); // Add styling classes as needed

    // Create the shopping cart icon as an img element
    const shoppingCartIcon = document.createElement('img');
    shoppingCartIcon.src = 'pictures/add-to-cart.png'; // Adjust the path as needed
    shoppingCartIcon.alt = 'Shopping Cart'; // Accessibility: add an alt text
    shoppingCartIcon.style.width = '24px'; // Example size, adjust as needed
    shoppingCartIcon.style.height = '24px'; // Example size, adjust as needed
    shoppingCartIcon.style.transition = 'transform 0.3s ease'; // Smooth transition for the hover effect

    // Apply hover effects specifically to the icon
    shoppingCartIcon.onmouseover = () => shoppingCartIcon.style.transform = 'scale(1.3)'; // Slightly enlarge icon on hover
    shoppingCartIcon.onmouseout = () => shoppingCartIcon.style.transform = ''; // Return to original size on mouse out

    // Append the shopping cart icon to the button
    shoppingCartButton.appendChild(shoppingCartIcon);

    // Append the button to the emptyActionCell
    emptyActionCell.appendChild(shoppingCartButton);

    // Append the emptyActionCell to the totalsRow
    totalsRow.appendChild(emptyActionCell);

    // Ensure the totalsRow has been added to the table body, as you've done in your function
    tableBody.appendChild(totalsRow);

    // Append the meal planner div (which includes the table) to the container
    mealPlannerContainer.appendChild(mealPlannerDiv);

    shoppingCartButton.addEventListener('click', function(){
        createShoppingCart(selectedRecipes);
    });
    
}


export { createMealPlannerTable, openModal };
