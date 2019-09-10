let mongoose = require('mongoose');

//***Developer Schema***
let developerSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    name:{
        firstName:{
            type: String,
            required:true
        },
        lastName: String
    },

    level: {
        type: String,
        validate: {
            validator: function (taskStatusValue){
                return taskStatusValue == "Beginner" || taskStatusValue == "Expert";
            },
            message: 'the task status should be either Beginner or Expert'
        },
        required: true

    },

    address:{
        state: String,
        suburb: String,
        street: String,
        unit: Number,
    },
})

module.exports = mongoose.model('Developers', developerSchema);
