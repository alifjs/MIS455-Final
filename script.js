// JavaScript for fetching data from the API and displaying results

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchText = document.getElementById('searchInput').value.trim();
    if (searchText !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data.meals,false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});

function displayResults(meals,showAll) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';
    if (meals && !showAll) {
        meals.slice(0, 5).forEach(meal => {
            const mealCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">Meal ID: ${meal.idMeal}</h5>
                        <h5 class="card-title">Meal Name: ${meal.strMeal}</h5>
                        <h5 class="card-title">Category: ${meal.strCategory}</h5>
                        <h5 class="card-title">Instructions: ${meal.strInstructions}</h5>
                    </div>
                </div>
            </div>
            `;
            mealResults.innerHTML += mealCard;
        });
        if (meals.length > 5) {
            document.getElementById('showAllBtn').style.display = 'block';
        }
    }else if  (meals && showAll) {
        meals.forEach(meal => {
            const mealCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">Meal ID: ${meal.idMeal}</h5>
                        <h5 class="card-title">Meal Name: ${meal.strMeal}</h5>
                        <h5 class="card-title">Category: ${meal.strCategory}</h5>
                        <h5 class="card-title">Instructions: ${meal.strInstructions}</h5>
                    </div>
                </div>
            </div>
            `;
            mealResults.innerHTML += mealCard;
        });
        document.getElementById('showAllBtn').style.display = 'none';
    }
}

document.getElementById('showAllBtn').addEventListener('click', function () {
    const searchText = document.getElementById('searchInput').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.meals,true);
        })
        .catch(error => console.error('Error fetching data:', error));
});