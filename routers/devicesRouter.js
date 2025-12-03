const express = require('express');
const DevicesService = require('../services/devicesService');

const router = express.Router();
const service = new DevicesService();

/**
 * @swagger
 * components:
 * schemas:
 * Device:
 * type: object
 * required:
 * - serialNumber
 * - ownerId
 * - zoneId
 * properties:
 * _id:
 * type: string
 * description: ID device
 * serialNumber:
 * type: string
 * description: Número de serie único del dispositivo
 * model:
 * type: string
 * description: Modelo del dispositivo
 * ownerId:
 * type: string
 * description: ID del usuario
 * zoneId:
 * type: string
 * description: ID de la zona
 * status:
 * type: string
 * enum: [active, maintenance, offline]
 * description: Estado actual del dispositivo
 * installedAt:
 * type: string
 * format: date-time
 * description: Fecha de instalación
 */

/**
 * @swagger
 * tags:
 * name: Devices
 * description: Gestión de dispositivos
 */

//OBTENER TODOS LOS DIVICES
/**
 * @swagger
 * /devices:
 * get:
 * summary: Obtener todos los dispositivos
 * tags: [Devices]
 * responses:
 * 200:
 * description: Lista de dispositivos obtenida correctamente
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Device'
 */

router.get('/', async (req, res, next) => {
  try {
    const devices = await service.find();
    res.json(devices);
  } catch (error) {
    next(error);
  }
});

//GET POR ID
/**
 * @swagger
 * /devices/{id}:
 * get:
 * summary: Obtener un dispositivo por su ID
 * tags: [Devices]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID del dispositivo
 * responses:
 * 200:
 * description: Detalle del dispositivo
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Device'
 * 404:
 * description: Dispositivo no encontrado
 * 400:
 * description: ID inválido
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await service.findOne(id);
    res.json(device);
  } catch (error) {
    next(error);
  }
});

//POST
/**
 * @swagger
 * /devices
 * post:
 * summary: Crear un nuevo dispositivo
 * tags: [Devices]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Device'
 * responses:
 * 201:
 * description: Dispositivo creado exitosamente
 * 400:
 * description: Datos faltantes o IDs (Owner/Zone) no existen
 * 409:
 * description: El Serial Number ya existe
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newDevice = await service.create(body);
    res.status(201).json(newDevice);
  } catch (error) {
    next(error);
  }
});

//PATCH

/**
 * @swagger
 * /devices/{id}:
 * patch:
 * summary: Actualizar un dispositivo
 * tags: [Devices]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID del dispositivo a actualizar
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * model:
 * type: string
 * status:
 * type: string
 * enum: [active, maintenance, offline]
 * ownerId:
 * type: string
 * zoneId:
 * type: string
 * example:
 * status: "maintenance"
 * responses:
 * 200:
 * description: Dispositivo actualizado
 * 404:
 * description: Dispositivo no encontrado
 * 400:
 * description: Error de validación (Status inválido o IDs inexistentes)
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const device = await service.update(id, body);
    res.json(device);
  } catch (error) {
    next(error);
  }
});

//DELETE

/**
 * @swagger
 * /devices/{id}:
 * delete:
 * summary: Eliminar un dispositivo
 * tags: [Devices]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID del dispositivo a eliminar
 * responses:
 * 200:
 * description: Dispositivo eliminado correctamente
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * message:
 * type: string
 * 404:
 * description: Dispositivo no encontrado
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
