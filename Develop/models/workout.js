const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutSchema = new Schema(
    {
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter an excercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name"
            }
    }
})