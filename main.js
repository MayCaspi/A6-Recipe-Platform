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


// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const newRecipeMenu = document.querySelector('#newRecipe-page');
    const mealPlannerMenu = document.querySelector('#mealPlanner-page');
    let scrollPos = window.scrollY;
    // console.log(scrollPos); 
    // used to find the correct values for scrollPos (try to run it on your browser's console)

    // adds 'highlight' class to menu items
    if (scrollPos < 750) {
        homeMenu.classList.add('highlight');
        newRecipeMenu.classList.remove('highlight');
        return;
    } else if (scrollPos < 1700) {
        newRecipeMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        mealPlannerMenu.classList.remove('highlight');
        return;
    } else if (scrollPos < 2345) {
        mealPlannerMenu.classList.add('highlight');
        newRecipeMenu.classList.remove('highlight');
        return;
    }
};

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
            return item.textContent;
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

//May
//popup for each recipe when clicked
document.addEventListener('DOMContentLoaded', () => {
    const recipeCards = document.querySelectorAll('.recipe-card'); 
    const recipePopup = document.getElementById('recipePopup');
    // get references to popup elements: title, image, and instructions
    const [popupTitle, popupImage, popupInstructions] = ['popupTitle', 'popupImage', 'popupInstructions'].map(id => document.getElementById(id));

    recipeCards.forEach(card => card.addEventListener('click', () => {
        const title = card.querySelector('.title').textContent;
        const imageSrc = card.querySelector('img').src;
        const instructions = card.querySelector('.description').textContent;

        popupTitle.textContent = title;
        popupImage.src = imageSrc;
        popupInstructions.textContent = instructions;
        recipePopup.classList.remove('hidden');
    }));
    //closes the popup when clicked on the background
    recipePopup.addEventListener('click', event => {
        if (event.target === recipePopup) recipePopup.classList.add('hidden');
    });
});



// finish my fake list



window.addEventListener('scroll', highlightMenu);