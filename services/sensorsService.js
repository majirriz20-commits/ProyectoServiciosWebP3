const boom = require('@hapi/boom');
const Sensor = require('../models/sensor.model');
const Reading = require('../models/reading.model');

class SensorsService {

    // Obtener todos
    async getAll() {
        return await Sensor.find().lean();
    }

    // Obtener por ID
    async getById(id) {
        const sensor = await Sensor.findById(id);
        return sensor;
    }

    // Crear sensor
    async create(data) {

        if (!this.isValidLocation(data.location)) {
            throw boom.badRequest("La ubicación debe ser lat,lng en formato válido");
        }
        const newSensor = await Sensor.create(data);
        return newSensor;
    }
    async updatePartial(id, changes) {

        if (changes.location && !this.isValidLocation(changes.location)) {
            throw boom.badRequest("La ubicación debe ser lat,lng en formato válido");
        }
        const updated = await Sensor.findByIdAndUpdate(id, changes, { new: true });
        if (!updated) {
            throw boom.notFound("Sensor no encontrado");
        }
        return updated;
    }
    async deleteById(id) {
        const sensor = await Sensor.findById(id);
        if (!sensor) {
            return null;
        }
        const readings = await Reading.findOne({ sensorId: id });
        if (readings) {
            throw boom.badRequest(
                "No se puede eliminar un sensor con lecturas asociadas. Elimínelas o reasigne antes."
            );
        }

        await Sensor.findByIdAndDelete(id);
        return sensor;
    }

    isValidLocation(value) {
        const regex = /^-?\d{1,3}\.\d+,\s?-?\d{1,3}\.\d+$/;
        return regex.test(value);
    }
}
module.exports = SensorsService;
