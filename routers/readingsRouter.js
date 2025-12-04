const express = require('express');
const ReadingService = require('../services/readingsService');

const router = express.Router();
const service = new ReadingService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       required:
 *         - sensorId
 *         - time
 *         - value
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del Reading
 *         sensorId:
 *           type: string
 *           description: ObjectId del Sensor asociado
 *         time:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora del registro
 *         value:
 *           type: number
 *           description: Valor leído por el sensor
 *       example:
 *         _id: "674d2a1291abf234abcd0987"
 *         sensorId: "673bd9120acff234abcd1234"
 *         time: "2025-01-12T15:32:10.000Z"
 *         value: 28.4
 */

/**
 * @swagger
 * tags:
 *   name: Readings
 *   description: Gestión de lecturas de sensores
 */

//
// GET ALL
//
/**
 * @swagger
 * /readings:
 *   get:
 *     summary: Obtener todas las lecturas
 *     tags: [Readings]
 *     responses:
 *       200:
 *         description: Lista de lecturas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reading'
 */

router.get('/', async (req, res, next) => {
  try {
    const reading = await service.getAll();
    res.json(reading);
  } catch (error) {
    next(error);
  }
});

//GET POR ID
/**
  * @swagger
 * /readings/{id}:
 *   get:
 *     summary: Obtener una lectura por ID
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Reading
 *     responses:
 *       200:
 *         description: Lectura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reading'
 *       404:
 *         description: Lectura no encontrada
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const read = await service.getById(id);
    res.json(read);
  } catch (error) {
    next(error);
  }
});

//POST
/**
* @swagger
 * /readings:
 *   post:
 *     summary: Crear una nueva lectura
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reading'
 *     responses:
 *       201:
 *         description: Lectura creada exitosamente
 *       400:
 *         description: ID de sensor no válido o faltan datos
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newRead = await service.create(body);
    res.status(201).json(newRead);
  } catch (error) {
    next(error);
  }
});

//PATCH

/**
  * @swagger
 * /readings/{id}:
 *   patch:
 *     summary: Actualizar una lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Reading a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *                 format: date-time
 *               value:
 *                 type: number
 *               sensorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lectura actualizada exitosamente
 *       404:
 *         description: Lectura no encontrada
 *       400:
 *         description: Validación inválida o sensor inexistente
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const read = await service.update(id, body);
    res.json(read);
  } catch (error) {
    next(error);
  }
});

//DELETE

/**
 * @swagger
 * /readings/{id}:
 *   delete:
 *     summary: Eliminar una lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Reading a eliminar
 *     responses:
 *       200:
 *         description: Lectura eliminada correctamente
 *       404:
 *         description: Lectura no encontrada
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
