function createShoppingCart(selectedRecipes) {
    // Create the modal backdrop
    const backdrop = document.createElement("div");
    backdrop.classList.add(
        "fixed",
        "inset-0",
        "bg-gray-900",
        "bg-opacity-50",
        "z-40"
    );
    document.body.appendChild(backdrop);

    // Create the modal popup
    const popup = document.createElement("div");
    popup.classList.add(
        "fixed",
        "top-1/2",
        "left-1/2",
        "transform",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "bg-white",
        "p-6",
        "rounded-md",
        "shadow-lg",
        "z-50",
        "text-left",
        "max-w-md",
        "w-full",
        "max-h-[90vh]",
        "overflow-auto"
    );

    // Create the close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add(
        "absolute",
        "top-0",
        "right-0",
        "mr-1",
        "text-gray-800",
        "text-2xl",
        "font-bold",
        "bg-transparent",
        "cursor-pointer"
    );
    closeBtn.addEventListener("click", function () {
        document.body.removeChild(popup);
        document.body.removeChild(backdrop);
    });

    // Add ingredients to the popup
    let allIngredients = [];
    Object.values(selectedRecipes).forEach(mealType => {
        mealType.forEach(recipe => {
            allIngredients = [...allIngredients, ...recipe.ingredients];
        });
    });
    let uniqueIngredients = Array.from(new Set(allIngredients));

    uniqueIngredients.forEach((ingredient) => {
        var ingredientItem = document.createElement('div');
        ingredientItem.className = 'flex items-center justify-between border-b py-2';

        var ingredientLabel = document.createElement('span');
        ingredientLabel.textContent = ingredient;
        ingredientLabel.className = 'text-lg flex-grow';
        ingredientItem.appendChild(ingredientLabel);

        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.min = 1;
        quantityInput.className = 'form-input text-center w-16';
        ingredientItem.appendChild(quantityInput);

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-checkbox h-5 w-5 text-green-600 ml-4';
        ingredientItem.appendChild(checkbox);

        popup.appendChild(ingredientItem);
    });

    // Add the "Download Groceries" button to the popup
    var downloadButton = document.createElement('button');
    downloadButton.innerText = 'Download Groceries';
    downloadButton.className = 'mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer';
    downloadButton.onclick = function() {
        var selectedGroceries = Array.from(popup.querySelectorAll('div.flex')).map((ingredientDiv, index) => {
            var label = ingredientDiv.querySelector('span').textContent;
            var quantity = ingredientDiv.querySelector('input[type="number"]').value;
            var isChecked = ingredientDiv.querySelector('input[type="checkbox"]').checked;
            return isChecked ? `${label}: ${quantity}` : '';
        }).filter(ingredient => ingredient).join('\n');

        var blob = new Blob([selectedGroceries], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        var downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'groceries.txt';
        downloadLink.click();
        window.URL.revokeObjectURL(url);
    };

    // Append close button and the download button to the popup
    popup.appendChild(closeBtn);
    popup.appendChild(downloadButton);

    // Append the popup to the body
    document.body.appendChild(popup);
}

export { createShoppingCart };