const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true // Crea createdAt y updatedAt automáticamente
    }
);

module.exports = mongoose.model('Zone', ZoneSchema);
