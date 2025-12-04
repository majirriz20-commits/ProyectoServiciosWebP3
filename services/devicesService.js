const Device = require('../models/device.model');
const User = require('../models/user.model');
const Zone = require('../models/zone.model');
const boom = require('@hapi/boom');

class DevicesService {

    // Obtener todos
    async getAll() {
        return await Device.find().lean();
    }

    // Obtener por ID
    async getById(id) {
        const device = await Device.findById(id);
        if (!device) {
            throw boom.notFound('Device no encontrado');
        }
        return device;
    }

    // Crear un nuevo device
    async create(data) {

        // Validar serialNumber único
        const existDevice = await Device.findOne({ serialNumber: data.serialNumber });
        if (existDevice) {
            throw boom.conflict('El Serial Number ya existe');
        }

        // Validar User
        const userExists = await User.findById(data.ownerId);
        if (!userExists) {
            throw boom.badRequest('El ownerId no corresponde a un usuario existente');
        }

        // Validar Zone
        const zoneExists = await Zone.findById(data.zoneId);
        if (!zoneExists) {
            throw boom.badRequest('El zoneId no corresponde a una zona existente');
        }

        // Validar status permitido
        const validStatuses = ['active', 'maintenance', 'offline'];
        if (data.status && !validStatuses.includes(data.status)) {
            throw boom.badRequest('Status inválido');
        }

        return await Device.create(data);
    }

    // Actualizar dispositivo
    async update(id, changes) {

        if (changes.ownerId) {
            const userExists = await User.findById(changes.ownerId);
            if (!userExists) {
                throw boom.badRequest('El nuevo ownerId no existe');
            }
        }

        if (changes.zoneId) {
            const zoneExists = await Zone.findById(changes.zoneId);
            if (!zoneExists) {
                throw boom.badRequest('El nuevo zoneId no existe');
            }
        }

        const device = await Device.findByIdAndUpdate(id, changes, { new: true });
        if (!device) {
            throw boom.notFound('Device no encontrado');
        }

        return device;
    }

    // Eliminar
    async delete(id) {
        const device = await Device.findByIdAndDelete(id);
        if (!device) {
            throw boom.notFound('Device no encontrado');
        }
        return { id, message: 'Device eliminado correctamente' };
    }
}

module.exports = DevicesService;
