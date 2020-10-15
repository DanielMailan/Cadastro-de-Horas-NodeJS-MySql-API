const accessDB = require('../connection.js'); // Importa a função de conexão com o DB de forma fácil

module.exports = {
    async index (req,res) {
        await accessDB('SELECT * FROM Projects', (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async show (req,res) {
        await accessDB(`SELECT * FROM Projects WHERE ProjectID = ${req.params.id}`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async insert (req,res) {
        await accessDB(`INSERT INTO Projects (name) VALUES ('${req.body.name}')`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async update (req,res) {
        await accessDB(`UPDATE Projects SET name = '${req.body.name}' WHERE ProjectID = ${req.body.ProjectID}`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async remove (req,res) {
        await accessDB(`DELETE FROM Projects WHERE ProjectID = ${req.body.ProjectID}`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    }
};