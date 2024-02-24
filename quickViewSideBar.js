function createQuickViewMealPlan() {
    const newQuickView = document.getElementById('sideQuickView');

    // Button: Click for Quick View
    const clickForSideBar = document.createElement('button');
    clickForSideBar.classList.add('bg-green-500', 'text-white', 'px-2', 'py-1', 'mt-2', 'rounded', 'shadow-green-800', 'shadow-xl');
    clickForSideBar.textContent = 'Click for Side Bar';

    // Sidebar: Meal Plan
    const mealPlanSideBar = document.createElement('div');
    mealPlanSideBar.id = 'mealPlanSideBar';
    mealPlanSideBar.classList.add('hidden', 'fixed', 'top-1/2', 'right-0', 'transform', '-translate-y-1/2', 'w-35%', 'bg-gradient-to-r', 'bg-gray-50', 'p-6', 'rounded-lg', 'shadow-lg');

    // Close Button
    const closeSideBar = document.createElement('button');
    closeSideBar.id = 'closeSideBar';
    closeSideBar.classList.add('absolute', 'top-2', 'right-2', 'text-green-800', 'text-2xl', 'cursor-pointer');
    closeSideBar.textContent = '×';

    // Title
    const title = document.createElement('h2');
    title.classList.add('text-2xl', 'font-bold', 'mb-4', 'font-ui', 'text-green-700');
    title.textContent = 'Your Daily Meal Planner';

    // Meal Items List
    const mealList = document.createElement('ul');
    const meals = ['Breakfast: Pizza Margherita, Fries, Grilled Chicken Salad, Hot Dog', 'Lunch:', 'Dinner:'];
    meals.forEach((meal, index) => {
        const listItem = document.createElement('li');
        listItem.id = `row-${index === 0 ? 'Breakfast' : index === 1 ? 'Lunch' : 'Dinner'}`;
        listItem.classList.add('text-gray-800');
        listItem.textContent = meal;
        mealList.appendChild(listItem);
    });

    // Nutritional Values
    const nutritionalValues = document.createElement('div');
    nutritionalValues.classList.add('mb-5');

    const valuesTitle = document.createElement('h3');
    valuesTitle.classList.add('text-l', 'text-green-800', 'underline');
    valuesTitle.textContent = 'Nutritional values per day:';

    const valuesList = document.createElement('ul');
    const valueTypes = ['Calories', 'Proteins', 'Fats'];
    valueTypes.forEach(valueType => {
        const listItem = document.createElement('li');
        listItem.id = `row-${valueType}`;
        listItem.classList.add('text-gray-800');
        valuesList.appendChild(listItem);
    });

    nutritionalValues.appendChild(valuesTitle);
    nutritionalValues.appendChild(valuesList);

    // Get Shopping List Button
    const getShoppingListBtn = document.createElement('button');
    getShoppingListBtn.id = 'getShoppingListBtn';
    getShoppingListBtn.classList.add('bg-green-600', 'text-white', 'px-2', 'py-1', 'rounded');
    getShoppingListBtn.textContent = 'Get Shopping List';

    // Append elements to sidebar
    mealPlanSideBar.appendChild(closeSideBar);
    mealPlanSideBar.appendChild(title);
    mealPlanSideBar.appendChild(mealList);
    mealPlanSideBar.appendChild(document.createElement('br'));
    mealPlanSideBar.appendChild(nutritionalValues);
    mealPlanSideBar.appendChild(getShoppingListBtn);

    // Append elements to sideQuickView container
    newQuickView.appendChild(clickForSideBar);
    newQuickView.appendChild(mealPlanSideBar);
}

export { createQuickViewMealPlan };
