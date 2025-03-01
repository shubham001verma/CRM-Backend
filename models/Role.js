const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [
        {
            module: { type: String, required: true }, // e.g., "User Management", "Orders"
             subPermissions: {
                add: { type: Boolean, default: false },
                edit: { type: Boolean, default: false },
                view: { type: Boolean, default: false },
                delete: { type: Boolean, default: false }
            }
        }
    ],
    createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', },
}, 
 {
    timestamps: true, // To track creation and updates
});

module.exports = mongoose.model('Role', roleSchema);