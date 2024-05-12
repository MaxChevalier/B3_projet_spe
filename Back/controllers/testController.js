const Test = require('../models/testModel');

async function getAllTests(req, res) {
  try {
    const tests = await Test.findAll();
    res.status(200).json(tests);
  } catch (error) {
    console.error('Erreur lors de la récupération des tests :', error);
    res.status(500).send('Erreur serveur lors de la récupération des tests');
  }
}

async function getTestById(req, res) {
  const testId = req.params.id;
  try {
    const test = await Test.findByPk(testId);
    if (!test) {
      return res.status(404).send('Test non trouvé');
    }
    res.status(200).json(test);
  } catch (error) {
    console.error('Erreur lors de la récupération du test :', error);
    res.status(500).send('Erreur serveur lors de la récupération du test');
  }
}

async function addTest(req, res) {
  const { id_level, date, score } = req.body;
  try {
    const newTest = await Test.create({ id_level, date, score });
    res.status(200).json(newTest);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du test :', error);
    res.status(500).send('Erreur serveur lors de l\'ajout du test');
  }
}

async function updateTest(req, res) {
  const testId = req.params.id;
  const { id_level, date, score } = req.body;
  try {
    const test = await Test.findByPk(testId);
    if (!test) {
      return res.status(404).send('Test non trouvé');
    }
    await test.update({ id_level, date, score });
    res.status(200).json(test);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du test :', error);
    res.status(500).send('Erreur serveur lors de la mise à jour du test');
  }
}

async function deleteTest(req, res) {
  const testId = req.params.id;
  try {
    const test = await Test.findByPk(testId);
    if (!test) {
      return res.status(404).send('Test non trouvé');
    }
    await test.destroy();
    res.status(200);
  } catch (error) {
    console.error('Erreur lors de la suppression du test :', error);
    res.status(500).send('Erreur serveur lors de la suppression du test');
  }
}

module.exports = {
  getAllTests,
  getTestById,
  addTest,
  updateTest,
  deleteTest
};
