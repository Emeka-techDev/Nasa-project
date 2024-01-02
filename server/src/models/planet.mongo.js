import mongoose from "mongoose";

const planetSchema = {

    keplerName : {
        type: String,
        required: true
    }
}

const Planet = mongoose.model('Planet', planetSchema);

export default Planet;