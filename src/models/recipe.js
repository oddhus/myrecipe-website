const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    preparation: {
        type: String,
        trim: true,
        required: true
    },
    ingredients: [{
            name: {
                type: String,
                trim: true
            },
            amount: {
                type: String,
                default: ''
            }
    }], 
    isPublic: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
