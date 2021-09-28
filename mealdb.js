const searchInpute = document.getElementById("inpute-field");
const searchBtn = document.getElementById("button-search");
searchInpute.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('inpute-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchFieldText == '') {
        const noResult = document.getElementById('empty-string');
        const div = document.createElement('div');
        div.innerHTML = `<h4 class="text-danger text-center">Please write something to display</h4>`
        noResult.appendChild(div);
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const displaySearchResult = meals => {
    const noResult = document.getElementById('empty-string');
    noResult.textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetial(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class ="card-body">
                <h5 class ="card-title">${meal.strMeal}</h5>
                <p class ="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
            `;
        searchResult.appendChild(div);
    });
}
const loadMealDetial = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetial(data.meals[0]))
}
const displayMealDetial = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div);
}