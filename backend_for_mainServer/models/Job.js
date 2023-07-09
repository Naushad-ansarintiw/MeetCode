const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    language: {
        type: String, 
        required: true,
        enum: ["cpp", "py"]
    },
    filepath: {
        type: String,
        required: true,
    },
    output: {
        success: {
            type: Boolean,
            default: false,
        }, 
        result: {
            type: mongoose.Schema.Types.Mixed,
        }
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "error"]
    }
})

const Job = new mongoose.model('job', jobSchema);

module.exports = Job;