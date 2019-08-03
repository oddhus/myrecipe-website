const titleEl = document.querySelector('#newtitle')
const preparationEl = document.querySelector('#newtext')
const ingredientEl = document.querySelector('#add-ingredient')
const ingredientButtonEl = document.querySelector('#add-ingredient-btn')
const ingredientList = document.querySelector('#ingredients')
const saveBtn = document.querySelector('#save-recipe')
const message1 = document.querySelector('#message-1')
const deleteBtn = document.querySelector('#delete-recipe')

const loadRecipe = () => {
    const title = sessionStorage.getItem('title')
    const preparation = sessionStorage.getItem('preparation')


    try {
    const recipeJSON = {
        title: JSON.parse(title) || '',
        preparation: JSON.parse(preparation) || ''
        }

        return recipeJSON
        
    } catch (e) {
        return[]
    } 
}

const loadIngredients = () => {
    const ingredientsJSON = sessionStorage.getItem('ingredients')
    try {
        return ingredientsJSON ? JSON.parse(ingredientsJSON) : []
    } catch (e) {
        return[]
    } 
}

const saveRecipe = () => {
    sessionStorage.setItem('title', JSON.stringify(recipe.title))
    sessionStorage.setItem('preparation', JSON.stringify(recipe.preparation))
}

const saveIngredients = () => {
    sessionStorage.setItem('ingredients', JSON.stringify(ingredients))
}

let recipe = []
let ingredients = []

const printIngredients = () => {
    ingredientList.innerHTML= ''
    if (ingredients.length > 0) {
        ingredients.forEach(ingredient => {
            const listEl = document.createElement('p')
            const removeBtn = document.createElement('button')
    
            listEl.innerHTML = `<b>${ingredient.name}</b> <small>Amount: ${ingredient.amount}</small>`
            listEl.classList.add('left')

            removeBtn.textContent = 'remove'
            removeBtn.classList.add('button', 'button--text') 

            listEl.appendChild(removeBtn)
            ingredientList.appendChild(listEl)

            removeBtn.addEventListener('click', (e) => {
                e.preventDefault()
                ingredients.splice(ingredients.indexOf(ingredient),1)
                sessionStorage.removeItem('ingredients')
                printIngredients()
                
            })
        })
    } else {
        const listEl = document.createElement('p')
        listEl.innerHTML = 'You have no ingredients added'
        ingredientList.appendChild(listEl)
    }
}

const importFromDB = async () => {
    const recipeID = window.location.pathname.replace('/createrecipe', '')
    if (recipeID) {
        try {
            const rawResponse =  await fetch('/recipes' + recipeID, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                }
            })
    
            if (rawResponse.status === 200) {
                try {
                    data = await rawResponse.json()
    
                    recipe.title = data.title
                    recipe.preparation = data.preparation
                    ingredients = data.ingredients
    
                    titleEl.value = data.title
                    preparationEl.value = data.preparation
                    printIngredients()
                } catch (error) {
                    console.log(error)
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    } else {
        recipe = loadRecipe()
        titleEl.value = recipe.title || ''
        preparationEl.value = recipe.preparation || ''

        ingredients = loadIngredients()
        printIngredients()
    }
    
}   

importFromDB()

const updateRecipe = (updates) => {

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.preparation === 'string') {
        recipe.preparation = updates.preparation
    }

    saveRecipe()

}

titleEl.addEventListener('input', (e) => {
    updateRecipe({
        title: e.target.value
    })
})

preparationEl.addEventListener('input', (e) => {
    updateRecipe({
        preparation: e.target.value
    })

})

const addIngredient = () => {
    const ingredient = document.createElement('input')
    const amount = document.createElement('input')

    //Attributes
    ingredient.setAttribute('placeholder', 'Ingredient')
    amount.setAttribute('placeholder', 'Amount')

    //Style
    ingredient.classList.add('main')
    ingredient.style.padding = '10px'
    ingredient.style.marginRight = '10px'
    ingredient.style.width = "42%"

    amount.classList.add('main')
    amount.style.padding = '10px'
    amount.style.marginRight = '10px'
    amount.style.width = "23%"

    //Append child
    ingredientEl.appendChild(ingredient)
    ingredientEl.appendChild(amount)


    //Button
    ingredientButtonEl.addEventListener('click', e => {
        e.preventDefault()
            ingredients.push({
                name: ingredient.value,
                amount: amount.value,
            
            })
        
        saveIngredients()

        ingredient.value = ''
        amount.value = ''
      
        printIngredients()
    
    })

}

const savetoDB = async () => {

    const recipeID = window.location.pathname.replace('/createrecipe', '')

    try {
        if (recipeID) {
            const rawResponse =  await fetch('/recipes' + recipeID, {
                method: 'PATCH',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: recipe.title,
                    preparation: recipe.preparation,
                    ingredients: ingredients
                
                })
            })

            if (rawResponse.status === 204) {
                message1.textContent = 'Success!'
                sessionStorage.clear()
                location.replace('/myrecipes')
            }
    
        } else {

            const rawResponse =  await fetch('/recipes', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    credentials: 'same-origin'
                },
                body: JSON.stringify({
                    title: recipe.title,
                    preparation: recipe.preparation,
                    ingredients: ingredients
                
                })
            })

            if (rawResponse.status === 201) {
                message1.textContent = 'Success!'
                sessionStorage.clear()
                location.replace('/myrecipes')
            }
    
        }
        

    } catch (error) {
        console.log(error)
        message1.textContent = 'Failed'
    }
}

addIngredient()

saveBtn.addEventListener('click', (e) => {    
    const rawResponse = savetoDB()
    
})

const deleteFromDB = async () => {
    const recipeID = window.location.pathname.replace('/createrecipe', '')
    if (recipeID) {
        try {
            const rawResponse =  await fetch('/recipes' + recipeID, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                }
            })
    
            if(rawResponse.status === 200) {
                sessionStorage.clear()
                location.replace('/myrecipes')
            } else {
                message1.textContent = 'Not able to delete recipe'
            }
    
        } catch {
            message1.textContent = 'Error: ' + error
        }
    } else {
        sessionStorage.clear()
        importFromDB()
    }
    

    


}

deleteBtn.addEventListener('click', (e) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
        deleteFromDB()
    } else {
        
    } 
})