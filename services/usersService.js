const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const SALT = 10;

async function createUser(data) {
  const { name, email, password, role } = data;

  // Verificar si email existe
  const exists = await User.findOne({ email });
  if (exists) throw { status: 400, message: "El email ya está registrado" };

  // Cifrar contraseña
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  return await newUser.save();
}

async function getUsers() {
  return await User.find().select("-password"); // No mostrar password
}

async function getUserById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: "ID inválido" };
  }

  const user = await User.findById(id).select("-password");
  if (!user) throw { status: 404, message: "Usuario no encontrado" };

  return user;
}

async function updateUser(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: "ID inválido" };
  }


  if (data.password) {
    data.password = await bcrypt.hash(data.password, SALT);
  }

  const updated = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  }).select("-password");

  if (!updated) throw { status: 404, message: "Usuario no encontrado" };

  return updated;
}

async function deleteUser(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: "ID inválido" };
  }

  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) throw { status: 404, message: "Usuario no encontrado" };

  return deleted;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
