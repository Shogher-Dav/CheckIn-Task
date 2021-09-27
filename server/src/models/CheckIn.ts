const { Schema, model } = require('mongoose');

const userCheckInsSchema = new Schema({

    id: {
        type: String,
        required: [true, 'Please add an id'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: [true, 'This name is already saved'],

    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
            default: 'Point'

        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

userCheckInsSchema.index({ location: '2dsphere' });



module.exports = model('CheckIn', userCheckInsSchema);