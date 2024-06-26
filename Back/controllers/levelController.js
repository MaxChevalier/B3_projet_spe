const Level = require('../models/level');

async function getAllLevels(req, res) {
  try {
    const levels = await Level.findAll();
    return res.status(200).json(levels);
  } catch (error) {
    console.error('Erreur lors de la récupération des niveaux :', error);
    return res.status(500).send('Erreur serveur lors de la récupération des niveaux');
  }
}

async function getLevelById(req, res) {
  const levelId = req.params.id;
  try {
    const level = await Level.findByPk(levelId);
    if (!level) {
      return res.status(404).send('Niveau non trouvé');
    }
    return res.status(200).json(level);
  } catch (error) {
    console.error('Erreur lors de la récupération du niveau :', error);
    return res.status(500).send('Erreur serveur lors de la récupération du niveau');
  }
}

async function addLevel(req, res) {
  const { name, creator, size_x, size_y, obstacles, defaultObstacleId, defaultLayout } = req.body;
  try {
    const newLevel = await Level.create({ name, creator, creation_date: new Date(), modification_date: new Date(), size_x, size_y, obstacles, defaultObstacleId, defaultLayout });
    return res.status(200).json(newLevel);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du niveau :', error);
    return res.status(500).send('Erreur serveur lors de l\'ajout du niveau');
  }
}

async function updateLevel(req, res) {
  const levelId = req.params.id;
  const { name, creator, size_x, size_y, obstacles, defaultObstacleId, defaultLayout } = req.body;
  try {
    const level = await Level.findByPk(levelId);
    if (!level) {
      return res.status(404).send('Niveau non trouvé');
    }
    await level.update({ name, creator, creation_date: new Date(), modification_date: new Date(), size_x, size_y, obstacles, defaultObstacleId, defaultLayout });
    return res.status(200).json(level);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du niveau :', error);
    return res.status(500).send('Erreur serveur lors de la mise à jour du niveau');
  }
}

async function deleteLevel(req, res) {
  const levelId = req.params.id;
  try {
    const level = await Level.findByPk(levelId);
    if (!level) {
      return res.status(404).send('Niveau non trouvé');
    }
    await level.destroy();
    return res.status(200);
  } catch (error) {
    console.error('Erreur lors de la suppression du niveau :', error);
    return res.status(500).send('Erreur serveur lors de la suppression du niveau');
  }
}

module.exports = {
  getAllLevels,
  getLevelById,
  addLevel,
  updateLevel,
  deleteLevel
};
