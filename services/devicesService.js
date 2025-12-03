const Device = require('../models/device.model')
const User = require('../models');
const Zone =  require();

class DevicesService {
    //Obtener todos
    async getAll(){
        return await Device.find().lean();
    }

    //Obtener por ID
    async getById(id){
        const device = await Device.findById(id);
        if (!device){
            throw boom.notFound('Device no encontrado');
        }
        return device;
    }

    //Crear un nuevo device
    async create(data){
        const existDevice =  await Device.findById({serialNumber: data.serialNumber});
        if (existDevice){
            throw boom.conflic('El serial Number ya existe')
        }
        //Valida si el user existe
        const userExists = await User.findById(data.ownerId);
        if (!userExists) {
            throw boom.badRequest('El ID proporcionado no existe');
        }
        //Valida si la zona existe
        const zoneExists = await Zone.findById(data.zoneId);
        if (!zoneExists) {
            throw boom.badRequest('El ID proporcionado no existe');
        }

        //Valida el status permitido
        const validStatuses = ['active', 'maintenance', 'offline'];
        if (data.status && !validStatuses.includes(data.status)) {
            throw boom.badRequest('Status inválido');
        }

        const newDevice = await Device.create(data);
        return newDevice;
    }

    //Actualizar un device
    async update(id, changes){
        //Si intentamos cambiar el ID de owner primero validamos que exista
        if (changes.ownerId){
            const userExists = await User.findById(changes.ownerId);
            if (!userExists) throw boom.badRequest('El nuevo ID no existe');
        }

        //Si intentamos cambiar el ID de zone primero validamos que exista
        if (changes.zoneId){
            const zoneExists = await User.findById(changes.zoneId);
            if (!zoneExists) throw boom.badRequest('El nuevo ID no existe');
        }

        // Devuelve el objeto actualizado con los ID
        const device = await Device.findByIdAndUpdate(id, changes, { new: true });

        if (!device) {
        throw boom.notFound('Devicend no encontrado');
        }
        return device;
    }

    //Eliminar
    async delete(id){
        const device = await Device.findByIdAndDelete(id);
        if(!device){
            throw boom.notFound('Device no encontrado')
        }
        return {id,  message: 'Divece eliminado'}
    }
}

module.exports = DevicesService;
