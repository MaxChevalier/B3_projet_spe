const User = require('../models/userModel');

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).send('Erreur serveur lors de la récupération des utilisateurs');
  }
}

async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).send('Erreur serveur lors de la récupération de l\'utilisateur');
  }
}

async function addUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.send('Utilisateur ajouté avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    res.status(500).send('Erreur serveur lors de l\'ajout de l\'utilisateur');
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    await user.update({ name, email, password });
    res.send('Utilisateur mis à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).send('Erreur serveur lors de la mise à jour de l\'utilisateur');
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    await user.destroy();
    res.send('Utilisateur supprimé avec succès !');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).send('Erreur serveur lors de la suppression de l\'utilisateur');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
