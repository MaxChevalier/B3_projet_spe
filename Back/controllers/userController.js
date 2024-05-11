const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const tokens = require('../middlewares/token');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
function generateToken(user) {
  const token = jwt.sign({ id: user.id, email: user.email }, tokens.Token.secretKey);
  return token;
}

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
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send('Cet email est déjà utilisé.');
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ name, email, password: hashedPassword, role: 'user'});
    const token = generateToken(newUser);
    res.json({ token });
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
    const token = generateToken(user);
    res.json({token})
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

async function login(req, res) {
  const { email, password } = req.body;
  try {
    console.log(email);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Utilisateur non trouvé');
    }
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Mot de passe incorrect');
    }
    const token = generateToken(user);
    res.json({ token, message: 'Connexion réussie' });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Erreur serveur lors de la connexion');
  }
}


async function info(req, res) {
  try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, tokens.Token.secretKey);
    const user = await User.findByPk(decoded.id);
    res.json(user);
  }catch(error){
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).send('Erreur serveur lors de la récupération de l\'utilisateur');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  login,
  info
};
