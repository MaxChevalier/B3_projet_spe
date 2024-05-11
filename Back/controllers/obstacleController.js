const Obstacle = require('../models/obstacle');

async function getAllObstacles(req, res) {
  try {
    const obstacles = await Obstacle.findAll();
    res.json(obstacles);
  } catch (error) {
    console.error('Erreur lors de la récupération des obstacles :', error);
    res.status(500).send('Erreur serveur lors de la récupération des obstacles');
  }
}

async function getObstacleById(req, res) {
  const obstacleId = req.params.id;
  try {
    const obstacle = await Obstacle.findByPk(obstacleId);
    if (!obstacle) {
      return res.status(404).send('Obstacle non trouvé');
    }
    res.json(obstacle);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'obstacle :', error);
    res.status(500).send('Erreur serveur lors de la récupération de l\'obstacle');
  }
}

async function addObstacle(req, res) {
  const { name, image, type, through,descrition, speed } = req.body;
  try {
    const newObstacle = await Obstacle.create({ name, image, type, through,descrition, speed });
    res.send('Obstacle ajouté avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'obstacle :', error);
    res.status(500).send('Erreur serveur lors de l\'ajout de l\'obstacle');
  }
}

async function updateObstacle(req, res) {
  const obstacleId = req.params.id;
  const { name, image, type, through,descrition, speed } = req.body;
  try {
    const obstacle = await Obstacle.findByPk(obstacleId);
    if (!obstacle) {
      return res.status(404).send('Obstacle non trouvé');
    }
    await obstacle.update({ name, image, type, through,descrition, speed });
    res.send('Obstacle mis à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'obstacle :', error);
    res.status(500).send('Erreur serveur lors de la mise à jour de l\'obstacle');
  }
}

async function deleteObstacle(req, res) {
  const obstacleId = req.params.id;
  try {
    const obstacle = await Obstacle.findByPk(obstacleId);
    if (!obstacle) {
      return res.status(404).send('Obstacle non trouvé');
    }
    await obstacle.destroy();
    res.send('Obstacle supprimé avec succès !');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'obstacle :', error);
    res.status(500).send('Erreur serveur lors de la suppression de l\'obstacle');
  }
}

module.exports = {
  getAllObstacles,
  getObstacleById,
  addObstacle,
  updateObstacle,
  deleteObstacle
};
