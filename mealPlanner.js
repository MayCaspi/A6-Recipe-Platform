function createMealPlannerTable() {
    const mealPlannerContainer = document.getElementById('mealPlanner');
    mealPlannerContainer.classList.add('text-3xl', 'font-bold', 'px-2')
    const mealPlannerDiv = document.createElement('div');
    mealPlannerDiv.classList.add('text-xl', 'font-bold', 'px-2');

    // Create and append the inner HTML
    const plannerHeader = document.createElement('div');
    plannerHeader.classList.add('text-xl', 'font-bold');
    plannerHeader.textContent = 'Plan your meals for the day.';
    mealPlannerDiv.appendChild(plannerHeader);

    const table = document.createElement('table');
    table.classList.add('w-full', 'border', 'border-gray-300', 'rounded', 'shadow-md');

    // Table Head
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const tableHeadColumns = ['Meal', 'Recipe', 'Ingredients', 'Calories', 'Proteins', 'Fats'];

    tableHeadColumns.forEach(columnText => {
        const column = document.createElement('th');
        column.classList.add('py-2', 'px-4', 'text-left');
        column.textContent = columnText;
        tableHeadRow.appendChild(column);
    });

    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);

    // Separator Line
    const separatorLine = document.createElement('tr');
    separatorLine.innerHTML = '<td class="py-2 px-2 border-t-2" colspan="7"></td>'; // Adjusted colspan
    table.appendChild(separatorLine);

    // Table Body
    const tableBody = document.createElement('tbody');

    // Example meal data (you can replace it with dynamic data)
    const mealsData = [
        { meal: 'Breakfast', recipe: 'Green Salad', ingredients: 'Cucumber, Tomato, Onion', calories: '150', proteins: '5g', fats: '10g' },
        { meal: 'Lunch', recipe: 'Pizza Margherita', ingredients: 'Dough, Tomatoes, Mozzarella cheese, Olive oil, Basil', calories: '800', proteins: '20g', fats: '18g' },
        { meal: 'Dinner', recipe: 'Chicken Breast', ingredients: 'Chicken breast, Olive oil, Garlic, Herbs and spices', calories: '400', proteins: '8g', fats: '60g' }
        // Add more meals as needed
    ];

    let totalCalories = 0;
    let totalProteins = 0;
    let totalFats = 0;

    mealsData.forEach((mealData, index) => {
        const row = document.createElement('tr');
        const columns = ['meal', 'recipe', 'ingredients', 'calories', 'proteins', 'fats'];

        columns.forEach(columnKey => {
            const cell = document.createElement('td');
            cell.classList.add('py-2', 'px-2'); // Adjusted padding
            cell.style.fontSize = '0.875rem'; // Smaller font size

            // Special case for the first column (Meal)
            if (columnKey === 'meal' && index > 0 && mealsData[index - 1].meal === mealData[columnKey]) {
                cell.classList.add('border-t-2');
            }

            if (columnKey === 'calories' || columnKey === 'proteins' || columnKey === 'fats') {
                const value = parseFloat(mealData[columnKey]);
                cell.textContent = value;
                // Update total values
                if (!isNaN(value)) {
                    if (columnKey === 'calories') totalCalories += value;
                    if (columnKey === 'proteins') totalProteins += value;
                    if (columnKey === 'fats') totalFats += value;
                }
            } else {
                cell.textContent = mealData[columnKey];
            }

            row.appendChild(cell);
        });

        // Delete button
        const deleteButtonCell = document.createElement('td');
        deleteButtonCell.classList.add('py-2', 'px-1'); // Adjusted padding
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Del';
        deleteButton.classList.add('bg-green-400', 'text-white', 'px-1', 'py-1', 'rounded', 'text-xs'); // Smaller and more beautiful
        deleteButton.addEventListener('click', () => {
            // Handle delete action here
            // You can remove the row or update your data structure accordingly
            // For now, let's log a message
            console.log(`Delete ${mealData.recipe}`);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        tableBody.appendChild(row);

        // Separator Line after each meal
        if (index < mealsData.length - 1 && mealData.meal !== mealsData[index + 1].meal) {
            const mealSeparatorLine = document.createElement('tr');
            mealSeparatorLine.innerHTML = '<td class="py-2 px-4 border-t-2" colspan="8"></td>'; // Adjusted colspan
            tableBody.appendChild(mealSeparatorLine);
        }
    });

    table.appendChild(tableBody);
    mealPlannerDiv.appendChild(table);

    // Separator Line after the total line
    const totalSeparatorLine = document.createElement('tr');
    totalSeparatorLine.innerHTML = '<td class="py-2 border-b" colspan="8"></td>'; // Adjusted colspan
    tableBody.appendChild(totalSeparatorLine);

    // Total Nutritional Values Line (Added at the end of the table)
    const totalLine = document.createElement('tr');
    totalLine.innerHTML = `<td class="px-4 font-semibold">Total</td>
                          <td class="py-2 px-4"></td>
                          <td class="py-2 px-4"></td>
                          <td class="py-2">${totalCalories.toFixed(2)}</td>
                          <td class="py-2">${totalProteins.toFixed(2)}g</td>
                          <td class="py-2">${totalFats.toFixed(2)}g</td>
                          <td class="py-2 px-4"></td>`; // Adjusted colspan
    tableBody.appendChild(totalLine);

    // Append the meal planner container to the existing div
    mealPlannerContainer.appendChild(mealPlannerDiv);
}

export { createMealPlannerTable };
