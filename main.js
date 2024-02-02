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
    document.getElementById("clickForSideBar").addEventListener("click", function () {
        var mealPlanDetails = document.getElementById('mealPlanSideBar');
        mealPlanDetails.classList.toggle('hidden');
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

window.addEventListener('scroll', highlightMenu);