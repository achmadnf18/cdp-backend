const mongoose = require('mongoose');

const containersSchema = mongoose.Schema({
    no_container: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    type: { 
        type: String,
    },
    slot: {
        type: Number
    },
    row: {
        type: Number
    },
    tier: {
        type: Number
    }
})


containersSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

exports.Containers = mongoose.model('Containers', containersSchema);
