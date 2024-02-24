  function createRecipe()
  {
    // Create the new recipe form container
    const newRecipeContainer = document.getElementById('newRecipe');

    const hrSpace = document.createElement('hr');
    newRecipeContainer.appendChild(hrSpace);

    const newRecipeDiv = document.createElement('div');
    
    newRecipeDiv.classList.add('text-center', 'bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'grid', 'justify-items-center');
  
    // Create and append the inner HTML
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('text-3xl', 'font-bold', 'mb-2');
    titleDiv.textContent = 'Add new recipe';
    newRecipeDiv.appendChild(titleDiv);
  
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('text-gray-600');
    descriptionParagraph.textContent = 'Add your recipe details here.';
    newRecipeDiv.appendChild(descriptionParagraph);
  
    // Input for Recipe
    const nameUserInput = createInput('NameUserAddNewRecipe', 'w-1/3', 'Enter Your Name');
    const nameRecipeInput = createInput('NameNewRecipe', 'w-1/3', 'Enter Recipe Title');
    const ingredientsInput = createInput('IngredientsNewRecipe', 'w-1/3', 'Enter Ingredients');
    ingredientsInput.style.height = '100px';
    ingredientsInput.style.paddingBottom = '80px';
    const instructionsInput = createInput('', 'w-1/3', 'Enter Instructions');
    instructionsInput.style.height = '200px';
    instructionsInput.style.paddingBottom = '180px';
  

    newRecipeDiv.appendChild(nameUserInput);
    newRecipeDiv.appendChild(nameRecipeInput);
    newRecipeDiv.appendChild(ingredientsInput);
    newRecipeDiv.appendChild(instructionsInput);
  
    // Input for Nutrition Values (2x2 Format)
    const nutritionGrid = document.createElement('div');
    nutritionGrid.classList.add('grid', 'grid-cols-2', 'gap-2', 'mt-2', 'w-1/3');
  
    const caloriesInput = createInput('newCal', 'w-full', 'Enter Calories');
    const fatInput = createInput('newFat', 'w-full', 'Enter Fat (g)');
    const proteinInput = createInput('newProtein', 'w-full', 'Enter Protein (g)');
  
    nutritionGrid.appendChild(caloriesInput);
    nutritionGrid.appendChild(fatInput);
    nutritionGrid.appendChild(proteinInput);
  
    newRecipeDiv.appendChild(nutritionGrid);
  
    // Container for File Input
    const fileInputContainer = document.createElement('div');
    fileInputContainer.classList.add('flex', 'items-center', 'w-1/3', 'mt-2', 'mb-10');
  
    const labelForImage = document.createElement('label');
    labelForImage.classList.add('cursor-pointer', 'bg-gray-200', 'text-gray-700', 'px-4', 'py-2', 'rounded-md');
    labelForImage.textContent = 'Upload Image';
  
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'recipeImage';
    fileInput.name = 'recipeImage';
    fileInput.accept = 'image/*';
    fileInput.classList.add('hidden');
  
    fileInputContainer.appendChild(labelForImage);
    fileInputContainer.appendChild(fileInput);
  
    newRecipeDiv.appendChild(fileInputContainer);
  
    // Button to Add a New Recipe
    const submitButton = document.createElement('button');
    submitButton.id = 'submitRecipeBtn';
    submitButton.classList.add('text-2xl', 'font-bold', 'p-4', 'bg-green-500', 'text-white', 'rounded-lg', 'shadow-md', 'mb-4', 'mx-auto', 'block', 'mt-2');
    submitButton.textContent = 'Submit Recipe';
  
    newRecipeDiv.appendChild(submitButton);
  
    // Append the new recipe form container to the existing div
    newRecipeContainer.appendChild(newRecipeDiv);
  }
  
  // Helper function to create input elements
  function createInput(id, classes, placeholder) 
  {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.classList.add('border', 'rounded', 'p-2', 'mt-2', 'text-sm', 'text-left');
    input.classList.add(classes);
    input.placeholder = placeholder;
  
    return input;
  }

  export{createRecipe}