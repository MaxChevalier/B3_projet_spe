const User = require('./models/userModel');
const Obstacle = require('./models/obstacle');
const Level = require('./models/level');
const test = require('./models/testModel');

async function migration() {
    await Promise.all([
        User.sync()
            .then(() => {
                console.log('Tables synchronisées avec succès !');
            })
            .catch(err => {
                console.error('Erreur lors de la synchronisation des tables :', err);
            }),

        Obstacle.sync()
            .then(() => {
                console.log('Tables synchronisées avec succès !');
            })
            .catch(err => {
                console.error('Erreur lors de la synchronisation des tables :', err);
            }),

        Level.sync()
            .then(() => {
                console.log('Tables synchronisées avec succès !');
            })
            .catch(err => {
                console.error('Erreur lors de la synchronisation des tables :', err);
            }),

        test.sync()
            .then(() => {
                console.log('Tables synchronisées avec succès !');
            })
            .catch(err => {
                console.error('Erreur lors de la synchronisation des tables :', err);
            }),
    ]);
}


if (require.main === module) migration();
else module.exports = migration;