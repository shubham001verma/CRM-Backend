const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
    try {
        const { name, permissions,createdby } = req.body;

        // Check if role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'Role already exists' });
        }

        const newRole = new Role({ name, permissions ,createdby});
        await newRole.save();

        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error: error.message });
    }
};

// Get all roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
};
exports.getRoleByUserId = async (req, res) => {

    try {
        const id = req.params.id;
        const role = await Role.find({createdby:id});
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role', error: error.message });
    }
};
// Get a single role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role', error: error.message });
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    try {
        console.log(req.body)
        const { name, permissions } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { name, permissions },
            { new: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error: error.message });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error: error.message });
    }
};
