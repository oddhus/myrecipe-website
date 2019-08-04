const recipeEl = document.querySelector('#recipe')
const searchTextEl = document.querySelector('#search-text')
const filterEl = document.querySelector('#filter-by')
const orderEl = document.querySelector('#order')

let recipes = []

const filters = {
    searchText: '',
    sortBy: 'updatedAt',
    order: 'desc'
}

const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }

    if (typeof updates.order === 'string') {
        filters.order = updates.order
    }
}

const getRecipeData = async (filters) => {

    try {
        const rawResponse = await fetch(`/recipes?sortBy=${filters.sortBy}:${filters.order}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
            }

        })

        if (rawResponse.status === 200) {
            const data = await rawResponse.json()
            renderRecipes(filters, data)
        } 



    } catch(error) {
        recipeEl.textContent = `Error: ${error}`
    }
}

const renderRecipes = async (filters, recipes) => {

    if(!recipes) {
        recipe.textContent = 'You have no recipes'
    }
    
    const filteredRecipes = recipes.filter((recipe) => {
        const titleMatch = recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const ingredientsMatch = Object.values(recipe.ingredients).some((ingredient) => {
            return ingredient.name.toLowerCase().includes(filters.searchText.toLowerCase())
        })

            return titleMatch || ingredientsMatch
    }) 

    filteredRecipes.forEach(element => {
        const listEl = document.createElement('p')
        const recipe = document.createElement('a')

        recipe.setAttribute('href', '/createrecipe/' + element._id)
        recipe.textContent = element.title

        listEl.appendChild(recipe)
        recipeEl.appendChild(listEl)
    })
}


getRecipeData(filters)

filterEl.addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    recipeEl.innerHTML = ''
    getRecipeData(filters)
})

orderEl.addEventListener('change', (e) => {
    setFilters({
        order: e.target.value
    })
    recipeEl.innerHTML = ''
    getRecipeData(filters)
})

searchTextEl.addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    recipeEl.innerHTML = ''
    getRecipeData(filters)
})