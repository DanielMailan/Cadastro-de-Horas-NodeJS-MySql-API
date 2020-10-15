const accessDB = require('../connection.js'); // Importa a função de conexão com o DB de forma fácil

module.exports = {
    async index (req,res) {
        await accessDB('SELECT * FROM Developers', (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async show (req,res) {
        await accessDB(`SELECT * FROM Developers WHERE DeveloperID = ${req.params.id}`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async insert (req,res) {
        await accessDB(`INSERT INTO Developers (name) VALUES ('${req.body.name}')`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async update (req,res) {
        await accessDB(`UPDATE Developers SET name = '${req.body.name}' WHERE DeveloperID = ${req.body.DeveloperID}`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async remove (req,res) {
        await accessDB(`DELETE FROM Developers WHERE DeveloperID = ${req.body.DeveloperID}`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    }
};