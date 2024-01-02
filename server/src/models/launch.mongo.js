import mongoose from "mongoose";

const launchSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100
    },

    mission : {
        type: 'String',
        required: true
    },

    rocket : {
        type: 'String',
        required: true
    },

    target: {
        type: 'String',
        required: true

    },

    launchDate : {
        type: Date,
        required: true
    },

    success: {
        type: Boolean,
        required: true,
        default: true 
    },

    upcoming: {
        type: Boolean,
        required: true
    },

    customers: [String]
})


const Launch = mongoose.model('launch', launchSchema);

export default Launch;