const Obstacle = require('../models/obstacle');

async function getAllObstacles(req, res) {
  try {
    const obstacles = await Obstacle.findAll();
    res.status(200).json(obstacles);
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
    res.status(200).json(obstacle);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'obstacle :', error);
    res.status(500).send('Erreur serveur lors de la récupération de l\'obstacle');
  }
}

async function addObstacle(req, res) {
  console.log(req.body);
  if (!req.body.name || !req.body.image || !req.body.type || req.body.through == null || req.body.through == undefined || !req.body.description || !req.body.speed) {
    missingFields = [];
    if (!req.body.name) {
      missingFields.push('name');
    }
    if (!req.body.image) {
      missingFields.push('image');
    }
    if (!req.body.type) {
      missingFields.push('type');
    }
    if (req.body.through == null || req.body.through == undefined) {
      missingFields.push('through');
    }
    if (!req.body.description) {
      missingFields.push('description');
    }
    if (!req.body.speed) {
      missingFields.push('speed');
    }
    console.error('Champs manquants :', missingFields);
  }
  const { name, image, type, through, description, speed } = req.body;
  try {
    const newObstacle = await Obstacle.create({ name, image, type, through, description, speed });
    res.status(200).json(newObstacle);
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
    res.status(200).json(obstacle);
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
    res.status(200);
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
