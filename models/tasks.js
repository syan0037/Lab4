let mongoose = require('mongoose');

//***Tasks Schema***
let taskSchema = mongoose.Schema({
    taskID:{
        type: Number,
        required: true
    },

    taskName:{
        type:String,
        required: true
    },

    // assignTo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Developers'

    // },
    assignTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Developers'
    },


    taskDue: {
        type: Date,
        default: Date.now
    },

    taskStatus:{
        type:String,
        validate: {
            validator: function (taskStatusValue){
                return taskStatusValue == "In Progress" || taskStatusValue == "Complete";
            },
            message: 'the task status should be either In Progress or Complete'
        },
        required: true
    },

    taskDesc:{
         type: String,
         required: true
    }
})

module.exports = mongoose.model('Tasks', taskSchema);