/*
 * Recipe schema and data accessor methods
 */

const { ObjectId } = require('mongodb')

const { getDbReference } = require('../lib/mongo')

/*
 * Recipe object schema
 */
const RecipeSchema = {
    name: { required: true },
    score: { required: false },
    ingredients: { required: true },
    steps: { required: true },
    category: { required: true },
    notes: { required: false }
}
exports.RecipeSchema = RecipeSchema

