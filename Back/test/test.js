console.log = () => { }

beforeAll(async () => {
    const fs = require('fs');
    const databaseFilePath = 'test_database.sqlite';
    // Vérifier si le fichier existe
    if (fs.existsSync(databaseFilePath)) {
        // Supprimer le fichier
        fs.unlinkSync(databaseFilePath);
        console.log('Le fichier test_database.sqlite a été supprimé avec succès.');
    } else {
        console.log('Le fichier test_database.sqlite n\'existe pas.');
    }
    process.env.NODE_ENV = "test";
    await require("../migration")();
});

require("./userController");
require("./obstacleController");
require("./levelController");
require("./testController");
