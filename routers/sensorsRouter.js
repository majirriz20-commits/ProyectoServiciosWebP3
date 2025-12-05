const express = require('express');
const SensorsService = require('../services/sensorsService');

const router = express.Router();
const service = new SensorsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       required:
 *         - type
 *         - unit
 *         - model
 *         - location
 *         - isActive
 *       properties:
 *         type:
 *           type: string
 *           enum: [temperature, humidity, co2, noise]
 *           description: Tipo de sensor
 *         unit:
 *           type: string
 *           enum: ["°C", "%", "ppm"]
 *           description: Unidad de medida
 *         model:
 *           type: string
 *           description: Modelo del sensor
 *         location:
 *           type: string
 *           description: Ubicación en lat/lng
 *         isActive:
 *           type: boolean
 *           description: Estado del sensor
 */

/**
 * @swagger
 * tags:
 *   name: sensors
 *   description: Endpoints para la gestión de sensores
 */


/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Obtener todos los sensores
 *     tags: [sensors]
 *     description: Retorna una lista de todos los sensores registrados.
 *     responses:
 *       200:
 *         description: Lista de sensores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Sensor"
 *             examples:
 *               ejemploExitoso:
 *                 value:
 *                   - id: "1"
 *                     type: "temperature"
 *                     unit: "°C"
 *                     model: "TX-100"
 *                     location: "20.9163, -101.3734"
 *                     isActive: true
 *                   - id: "2"
 *                     type: "co2"
 *                     unit: "ppm"
 *                     model: "CO2-Monitor"
 *                     location: "20.5000, -100.3000"
 *                     isActive: false
 *       400:
 *         description: Solicitud inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequestError"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */

router.get('/', async (req, res, next) => {
  try {
    const sensors = await service.getAll();
    res.json(sensors);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Obtener un sensor por ID
 *     tags: [sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del sensor a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sensor"
 *       404:
 *         description: Sensor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequestError"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */

router.get('/:id', async (req, res, next) => {
  try {
    const sensor = await service.getById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: "Sensor no encontrado" });
    }
    res.json(sensor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Crear un nuevo sensor
 *     tags: [sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - unit
 *               - model
 *               - location
 *               - isActive
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [temperature, humidity, co2, noise]
 *                 description: Tipo de sensor
 *               unit:
 *                 type: string
 *                 enum: ["°C", "%", "ppm"]
 *                 description: Unidad de medida
 *               model:
 *                 type: string
 *                 description: Modelo del sensor
 *               location:
 *                 type: string
 *                 description: Ubicación en formato lat,lng
 *               isActive:
 *                 type: boolean
 *                 description: Estado del sensor
 *     responses:
 *       201:
 *         description: Sensor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Datos inválidos o ubicación mal formada
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', async (req, res, next) => {
  try {
    const newSensor = await service.create(req.body);
    res.status(201).json(newSensor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /sensors/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un sensor
 *     tags: [sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del sensor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               unit:
 *                 type: string
 *               model:
 *                 type: string
 *               location:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sensor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       404:
 *         description: Sensor no encontrado
 *       400:
 *         description: Datos inválidos o ubicación mal formada
 *       500:
 *         description: Error interno del servidor
 */


router.patch('/:id', async (req, res, next) => {
  try {
    const updatedSensor = await service.updatePartial(req.params.id, req.body);

    if (!updatedSensor) {
      return res.status(404).json({ message: "Sensor no encontrado" });
    }

    res.json(updatedSensor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /sensors/{id}:
 *   delete:
 *     summary: Eliminar un sensor
 *     tags: [sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Sensor eliminado exitosamente
 *       404:
 *         description: Sensor no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedSensor = await service.deleteById(req.params.id);

    if (!deletedSensor) {
      return res.status(404).json({ message: "Sensor no encontrado" });
    }

    res.json({ message: "Sensor eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
