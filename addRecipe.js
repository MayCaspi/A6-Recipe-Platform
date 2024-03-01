  import { db } from "./server/server.js";
  import { storage } from "./server/server.js";
  import { collection, doc, setDoc, getDocs, addDoc,getFirestore } from "firebase/firestore";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
  
  function createNewRecipe()
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
    const DescriptionInput = createInput('NewDescription', 'w-1/3', 'Enter Description Title');
    const ingredientsInput = createInput('IngredientsNewRecipe', 'w-1/3', 'Enter Ingredients');
    ingredientsInput.style.height = '100px';
    ingredientsInput.style.paddingBottom = '80px';
    const preparationInput = createInput('preparationInput', 'w-1/3', 'Enter preparations');
    preparationInput.style.height = '200px';
    preparationInput.style.paddingBottom = '180px';
  

    newRecipeDiv.appendChild(nameUserInput);
    newRecipeDiv.appendChild(nameRecipeInput);
    newRecipeDiv.appendChild(DescriptionInput);
    newRecipeDiv.appendChild(ingredientsInput);
    newRecipeDiv.appendChild(preparationInput);
  
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
    fileInputContainer.classList.add('flex', 'items-center', 'w-1/3', 'mt-2', 'mb-4');
  
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
    labelForImage.addEventListener('click', () => fileInput.click());

    // Button to Add a New Recipe
    const submitButton = document.createElement('button');
    submitButton.id = 'submitRecipeBtn';
    submitButton.classList.add('text-2xl', 'font-bold', 'p-4', 'bg-green-500', 'text-white', 'rounded-lg', 'shadow-md', 'mb-4', 'mx-auto', 'block');
    submitButton.textContent = 'Submit Recipe';
  
    newRecipeDiv.appendChild(submitButton);
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
  
    // Append the new recipe form container to the existing div
    newRecipeContainer.appendChild(newRecipeDiv);
    submitButton.addEventListener("click", function() {
      submitRecipe();
    });
  }
  async function submitRecipe() {
    // Get values from input fields
    const Author = document.getElementById("NameUserAddNewRecipe").value.trim();
    const recipeName = document.getElementById("NameNewRecipe").value.trim();
    const ingredients = document.getElementById("IngredientsNewRecipe").value.trim().split('\n');
    const description = document.getElementById("NewDescription").value.trim().split('\n');
    const calories = document.getElementById("newCal").value.trim();
    const fat = document.getElementById("newFat").value.trim();
    const protein = document.getElementById("newProtein").value.trim();
    const preparation = document.getElementById("preparationInput").value.trim().split('\n');
    const file = document.getElementById('recipeImage').files[0]; // Get the file
    
    // Validate input data
    if (!recipeName || ingredients.length === 0 || !calories || !fat || !protein || !Author || !description || !preparation || !file) {
      alert("Please fill in all the required fields, including the recipe image.");
      return;
    }
  
    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `recipeImages/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const image = await getDownloadURL(snapshot.ref);
  
      // Create a new recipe object including the image URL
      const newRecipe = {
        Author: Author,
        description: description,
        name: recipeName,
        ingredients: ingredients,
        nutritionalValues: {
          calories: calories,
          fat: fat,
          protein: protein,
        },
        preparation: preparation,
        image: image, // Add the image URL to the recipe object
      };
  
      // Use `doc` to create a reference with the recipe name as the document ID
      const recipeRef = doc(collection(db, "recipe"), recipeName);
    
      // Use `setDoc` to create or overwrite the document at `recipeRef` with `newRecipe`
      await setDoc(recipeRef, newRecipe);
    
      console.log("Recipe submitted with ID: ", recipeRef.id);
      alert("Recipe submitted successfully!");
    
      // Clear input fields
      document.getElementById("NameNewRecipe").value = "";
      document.getElementById("IngredientsNewRecipe").value = "";
      document.getElementById("newCal").value = "";
      document.getElementById("newFat").value = "";
      document.getElementById("newProtein").value = "";
      document.getElementById("recipeImage").value = ""; // Clear the file input
    } catch (error) {
      console.error("Error submitting recipe or uploading image: ", error);
      alert("Error submitting recipe or uploading image. Please try again.");
    }
  }
  
  

  export{createNewRecipe}