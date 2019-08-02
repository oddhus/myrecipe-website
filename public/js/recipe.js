const recipeEl = document.querySelector('#recipe')
const buttonEl = document.querySelector('#createrecipe')
const searchTextEl = document.querySelector('#search-text')
const filterEl = document.querySelector('#filter-by')
const orderEl = document.querySelector('#order')

sessionStorage.clear()

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

const initializeRecipePage = async (filters) => {

    try {
        const rawResponse = await fetch(`/recipes?sortBy=${filters.sortBy}:${filters.order}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                //'Content-Type': 'application/json; charset=utf-8',
                // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }

        })

        // if(rawResponse.status === 200) {
        //     recipeEl.textContent = `Please login`
        //     return
        // }

        if(rawResponse.status === 204) {
            recipeEl.textContent = 'You have no recipes.'
        }

        if (rawResponse.status === 200) {
            try {
                let data = await rawResponse.json()

                if (filters.searchText) {
                    data = data.filter((recipe) => {
                        console.log(recipe.title)
                        const titleMatch = recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
                        const ingredientsMatch = Object.values(recipe.ingredients).some((ingredient) => {
                            return ingredient.name.toLowerCase().includes(filters.searchText.toLowerCase())
                        })

                        return titleMatch || ingredientsMatch
                    }) 

                }

                data.forEach(element => {
                    const listEl = document.createElement('p')
                    const recipe = document.createElement('a')

                    recipe.setAttribute('href', '/createrecipe/' + element._id)
                    recipe.textContent = element.title

                    listEl.appendChild(recipe)
                    recipeEl.appendChild(listEl)


                    })
            } catch (error) {
                recipeEl.textContent = 'Please login.'
                return
            }
            
        }

        
        const button = document.createElement("button")
        button.innerHTML = "Create recipe"
        buttonEl.appendChild(button)
        button.addEventListener('click', e => {
            location.replace('/createrecipe')
        })

    } catch (error) {
        recipeEl.textContent = `Error: ${error}`
    }
    
}

initializeRecipePage(filters)

filterEl.addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    recipeEl.innerHTML = ''
    buttonEl.innerHTML = ''
    initializeRecipePage(filters)
})

orderEl.addEventListener('change', (e) => {
    setFilters({
        order: e.target.value
    })
    recipeEl.innerHTML = ''
    buttonEl.innerHTML = ''
    initializeRecipePage(filters)
})

searchTextEl.addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    recipeEl.innerHTML = ''
    buttonEl.innerHTML = ''
    initializeRecipePage(filters)
})