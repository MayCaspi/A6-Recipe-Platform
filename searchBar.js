function createSearchBar(){
    // Create the search bar container
    const searchBarContainer = document.getElementById('searchBar');
    const searchBarDiv = document.createElement('div');
    searchBarDiv.classList.add('flex', 'justify-center');
  
    // Create and append the inner HTML
    const searchInput = createInput('', 'w-6/12', 'Search for a recipe');
    searchInput.classList.add('border', 'rounded', 'p-2', 'mx-2', 'text-sm');
  
    const searchButton = document.createElement('button');
    searchButton.classList.add('p-2', 'bg-green-500', 'text-white', 'rounded-md');
  
    const searchIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    searchIcon.setAttribute('fill', 'none');
    searchIcon.setAttribute('viewBox', '0 0 24 24');
    searchIcon.setAttribute('stroke', 'currentColor');
    searchIcon.classList.add('w-6', 'h-6');
  
    const searchPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    searchPath.setAttribute('stroke-linecap', 'round');
    searchPath.setAttribute('stroke-linejoin', 'round');
    searchPath.setAttribute('stroke-width', '2');
    searchPath.setAttribute('d', 'M21 21l-5.2-5.2');
    searchIcon.appendChild(searchPath);
  
    const searchCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    searchCircle.setAttribute('cx', '10');
    searchCircle.setAttribute('cy', '10');
    searchCircle.setAttribute('r', '8');
    searchIcon.appendChild(searchCircle);
  
    searchButton.appendChild(searchIcon);
  
    searchBarDiv.appendChild(searchInput);
    searchBarDiv.appendChild(searchButton);
    searchBarDiv.classList.add('mx-auto');
    // Append the search bar container to the existing div
    searchBarContainer.appendChild(searchBarDiv);
  }

function createInput(id, classes, placeholder) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.classList.add('text-sm', 'text-left');
    input.classList.add(classes);
    input.placeholder = placeholder;
  
    return input;
}
export {createSearchBar}