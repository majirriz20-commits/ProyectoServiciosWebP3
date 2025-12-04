const Reading = require('../models/reading.model');
const Sensor =  require('../models/sensor.model');
const boom = require('@hapi/boom');

class ReadingService {
    //Obtener todos
    async getAll(){
        return await Reading.find().lean();
    }

    //Obtener por ID
    async getById(id){
        const read = await Reading.findById(id);
        if (!read){
            throw boom.notFound('read no encontrado');
        }
        return read;
    }

    //Crear un nuevo reading
    async create(data){
        //Valida si el sensor existe
        const sensorExists = await Sensor.findById(data.sensorId);
        if (!sensorExists) {
            throw boom.badRequest('El ID proporcionado no existe');
        }

        const newRead = await Reading.create(data);
        return newRead;
    }

    //Actualizar
    async update(id, changes){
        //Si intentamos cambiar el ID de sensor primero validamos que exista
        if (changes.sensorId){
            const sensorExists = await Sensor.findById(changes.sensorId);
            if (!sensorExists) throw boom.badRequest('El nuevo ID no existe');
        }

        // Devuelve el objeto actualizado con los ID
        const read = await Reading.findByIdAndUpdate(id, changes, { new: true });

        if (!read) {
        throw boom.notFound('Reading no encontrado');
        }
        return read;
    }

    //Eliminar
    async delete(id){
        const read = await Reading.findByIdAndDelete(id);
        if(!read){
            throw boom.notFound('Read no encontrado')
        }
        return {id,  message: 'Read eliminado'}
    }
}

module.exports = ReadingService;
