const Zone = require('../models/zone.model');
const boom = require('@hapi/boom');

class ZonesService {

    // Obtener todas las zonas
    async getAll() {
        return await Zone.find().lean();
    }

    // Obtener zona por ID
    async getById(id) {
        const zone = await Zone.findById(id);
        if (!zone) {
            throw boom.notFound('Zone no encontrada');
        }
        return zone;
    }

    // Crear zona nueva
    async create(data) {

        // Validar nombre único
        const exists = await Zone.findOne({ name: data.name });
        if (exists) {
            throw boom.conflict('La zona con ese nombre ya existe');
        }

        // Validar campos permitidos
        if (data.isActive !== undefined && typeof data.isActive !== "boolean") {
            throw boom.badRequest('El campo isActive debe ser booleano');
        }

        const newZone = await Zone.create(data);
        return newZone;
    }

    // Actualizar zona
    async update(id, changes) {

        // Si se está cambiando el nombre, validar que no exista duplicado
        if (changes.name) {
            const existingZone = await Zone.findOne({ name: changes.name });
            if (existingZone && existingZone._id.toString() !== id) {
                throw boom.conflict('Ya existe otra zona con ese nombre');
            }
        }

        // Validar tipo de isActive
        if (changes.isActive !== undefined && typeof changes.isActive !== "boolean") {
            throw boom.badRequest('El campo isActive debe ser booleano');
        }

        const zone = await Zone.findByIdAndUpdate(id, changes, { new: true });

        if (!zone) {
            throw boom.notFound('Zone no encontrada');
        }

        return zone;
    }

    // Eliminar zona
    async delete(id) {
        const zone = await Zone.findByIdAndDelete(id);

        if (!zone) {
            throw boom.notFound('Zone no encontrada');
        }

        return { id, message: 'Zone eliminada correctamente' };
    }
}

module.exports = ZonesService;
