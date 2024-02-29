function createNav()
{
    var navBar = document.getElementById('navBar');
        // Create main container div
    var containerDiv = document.createElement('div');
    containerDiv.classList.add('mx-auto', 'flex', 'justify-between', 'items-center', 'py-3', 'bg-green-400', 'shadow-md', 'fixed', 'w-full', 'top-0', 'z-50');

    // Create div for the title
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('text-white', 'text-3xl', 'font-bold', 'start-0');
    titleDiv.textContent = 'Recipe Sharing & Meal Planning';

    // Create ul element
    var ulElement = document.createElement('ul');
    ulElement.classList.add('sm:flex', 'space-x-8', 'hidden', 'relative');

    // Create li elements and anchor tags
    var navItems = [
        { text: 'Home', href: '#Home', id:'home-page' },
        { text: 'New Recipe', href: '#newRecipe',id:'newRecipe-page' },
        { text: 'Meal Planner', href: '#banner',id:'mealPlanner-page' },
        { text: 'Shopping Cart', id:'clickForSideBar'},
        { text: 'dark', id: 'btnTheme' }
    ];

    navItems.forEach(item => {
        var liElement = document.createElement('li');
        if (item.text === 'dark') {
            var buttonElement = document.createElement('button');
            buttonElement.id = item.id;
            buttonElement.classList.add('text-white', 'text-xl', 'hover:text-blue-950', 'duration-200', 'border', 'border-white', 'mx-2', 'px-3', 'rounded-full');
            buttonElement.textContent = item.text;
            liElement.appendChild(buttonElement);
        } else {
            var anchorElement = document.createElement('a');
            anchorElement.href = item.href;
            anchorElement.id = item.id;
            anchorElement.classList.add('text-white', 'text-xl', 'hover:text-blue-950', 'duration-200');
            anchorElement.textContent = item.text;
            liElement.appendChild(anchorElement);
        }
        ulElement.appendChild(liElement);
    });

    // Create button for mobile menu
    var btnMenu = document.createElement('button');
    btnMenu.id = 'btnMenu';
    btnMenu.classList.add('border', 'border-slate-700', 'rounded', 'py-1', 'px-3', 'block', 'sm:hidden');
    btnMenu.textContent = 'menu';

    // Create pop-up div for mobile menu
    var popUpDiv = document.createElement('div');
    popUpDiv.id = 'popUp';
    popUpDiv.classList.add('justify-start', 'gap-4', 'sm:hidden', 'absolute', 'bg-slate-300', 'left-0', 'right-0', 'top-[70px]', 'p-4', 'pb-8', 'hidden');

    var popUpLinks = [
        { text: 'Home', href: '#Home' },
        { text: 'New Recipe', href: '#newRecipe' },
        { text: 'Meal Planner', href: '#mealPlanner' }
    ];

    popUpLinks.forEach(item => {
        var linkElement = document.createElement('a');
        linkElement.href = item.href;
        linkElement.classList.add('font-bold', 'hover:underline', 'text-2xl', 'block');
        linkElement.textContent = item.text;
        popUpDiv.appendChild(linkElement);
    });

    // Append elements to the main container
    containerDiv.appendChild(titleDiv);
    containerDiv.appendChild(ulElement);
    containerDiv.appendChild(btnMenu);
    containerDiv.appendChild(popUpDiv);

    navBar.appendChild(containerDiv);

    // Append the nav element to the body
    document.body.appendChild(navBar); 


    window.onload = function () {
        document.getElementById("btnTheme").addEventListener("click", function () {
            document.documentElement.classList.toggle("dark");
            document.getElementById("btnTheme").innerText = document.documentElement
                .classList.contains("dark") ? "light" : "dark";
        });

        document.getElementById("btnMenu").addEventListener("click", function () {
            document.getElementById("popUp").classList.toggle("hidden");
        });
    };
}




export {createNav}