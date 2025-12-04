const express = require("express");
const ZonesService = require('../services/zonesService');

const router = express.Router();
const service = new ZonesService();

/**
 * @swagger
 * /api/zones:
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
 * /api/zones/{id}:
 *   get:
 *     summary: Obtiene una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona encontrada
 *       404:
 *         description: Zona no encontrada
 */
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const zone = await service.getbyId(id);
        if (!zone) {
            return res.status(404).json({ message: "Zone Not Found" });
        }
        res.status(200).json(zone);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/zones:
 *   post:
 *     summary: Crea una nueva zona
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Zona creada
 */
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const newZone = await service.create(body);
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
 * /api/zones/{id}:
 *   put:
 *     summary: Actualiza una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Zona actualizada
 *       404:
 *         description: Zona no encontrada
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const zone = await service.update(id, body);
        res.status(200).json({
            message: "Zone Updated",
            data: zone
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   delete:
 *     summary: Elimina una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona eliminada
 *       404:
 *         description: Zona no encontrada
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const respuesta = await service.delete(id);
        res.status(200).json({
            message: "Zone Deleted",
            data: respuesta
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
