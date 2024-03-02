
    function createShoppingCart(selectedRecipes)
    {
        
        var popupWindow = window.open("", "ShoppingListPopup", "width=400,height=600,scrollbars=yes");
        let allIngredients = [];

    // Extract and deduplicate ingredients from selectedRecipes
    Object.values(selectedRecipes).forEach(mealType => {
        mealType.forEach(recipe => {
            allIngredients = [...allIngredients, ...recipe.ingredients];
        });
    });
    let uniqueIngredients = Array.from(new Set(allIngredients));

    // Create grocery list container
    var groceryListContainer = document.createElement("div");

    // Create and append checkboxes and labels for each ingredient
    uniqueIngredients.forEach(function(uniqueIngredients) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = uniqueIngredients;
        groceryListContainer.appendChild(checkbox);

        var label = document.createElement("label");
        label.textContent = uniqueIngredients;
        groceryListContainer.appendChild(label);

        groceryListContainer.appendChild(document.createElement("br"));
    });

    // Add Selected to Shopping List button
    var addButton = document.createElement("button");
    addButton.innerText = "Add Selected to Shopping List";
    addButton.addEventListener("click", function() {
        var checkboxes = groceryListContainer.querySelectorAll("input[type='checkbox']:checked");
        checkboxes.forEach(function(checkbox) {
            var newIngredient = checkbox.value;
            var listItem = document.createElement("li");
            listItem.textContent = newIngredient;

            var deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function() {
                shoppingList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            shoppingList.appendChild(listItem);
            checkbox.checked = false;
        });
    });

    // Shopping list container
    var shoppingList = document.createElement("ul");

    // Download Groceries button
    var downloadButton = document.createElement("button");
    downloadButton.innerText = "Download Groceries";
    downloadButton.addEventListener("click", function() {
        var selectedGroceries = Array.from(shoppingList.getElementsByTagName("li")).map(function(item) {
            return item.textContent.replace(/Delete/g, "").trim();
        }).join("\n");

        var blob = new Blob([selectedGroceries], {type: "text/plain"});
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.href = url;
        a.download = "groceries.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });

    // Close button
    var closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", function() {
        popupWindow.close();
    });

    // Append all elements to the popup window
    popupWindow.document.body.appendChild(groceryListContainer);
    popupWindow.document.body.appendChild(addButton);
    popupWindow.document.body.appendChild(shoppingList);
    popupWindow.document.body.appendChild(downloadButton);
    popupWindow.document.body.appendChild(closeButton);
}
export { createShoppingCart };