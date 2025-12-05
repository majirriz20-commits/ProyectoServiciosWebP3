const express = require("express");
const ZonesService = require('../services/zonesService');

const router = express.Router();
const service = new ZonesService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Zones
 *   description: Gestión de zonas
 */

/**
 * @swagger
 * /zones:
 *   get:
 *     summary: Obtiene todas las zonas
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: Lista de zonas
 */
router.get('/', async (req, res, next) => {
    try {
        const zones = await service.getAll();
        res.status(200).json(zones);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /zones/{id}:
 *   get:
 *     summary: Obtiene una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Zona encontrada
 *       404:
 *         description: Zona no encontrada
 */
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const zone = await service.getById(id);
        res.status(200).json(zone);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Crea una nueva zona
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       201:
 *         description: Zona creada
 */
router.post('/', async (req, res, next) => {
    try {
        const newZone = await service.create(req.body);
        res.status(201).json({
            message: "Zone Created",
            data: newZone
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /zones/{id}:
 *   patch:
 *     summary: Actualiza parcialmente una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la zona a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Zona Norte"
 *               description:
 *                 type: string
 *                 example: "Zona actualizada"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Zona actualizada
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.status(200).json({
            message: "Zone Updated",
            data: updated
        });
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /zones/{id}:
 *   delete:
 *     summary: Elimina una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la zona a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona eliminada correctamente
 *       404:
 *         description: Zona no encontrada
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await service.delete(id);

        res.status(200).json({
            message: "Zone Deleted",
            data: deleted
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
