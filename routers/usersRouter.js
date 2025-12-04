const express = require('express');
const router = express.Router();
const userService = require('../services/usersService');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) { next(err); }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    // Evita que Swagger mande llamadas sin ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const user = await userService.getUserById(id);
    res.json(user);

  } catch (err) { next(err); }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un usuario
 *     tags: [Users]
 */
router.post('/', async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) { next(err); }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) { next(err); }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;
