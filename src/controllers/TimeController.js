const accessDB = require('../connection.js'); // Importa a função de conexão com o DB de forma fácil

module.exports = {
    async index (req,res) {
        await accessDB('SELECT * FROM Time', (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    },

    async insert (req,res) {
        if (req.body.end_time < req.body.start_time) {
            res.send('Erro, a data final deve ser maior do que a data inicial');
        } else {
            await accessDB(`SELECT * FROM Developers WHERE name = '${req.body.DeveloperName}'`, async (result,err) => {
                await accessDB(`SELECT * FROM Projects WHERE name = '${req.body.ProjectName}'`, async (result2,err) => {
                    await accessDB(`INSERT INTO Time (start_time, end_time, DeveloperID, ProjectID) VALUES ('${req.body.start_time}', '${req.body.end_time}', ${result[0].DeveloperID}, ${result2[0].ProjectID})`, (result3, err) => {
                    if (err !== null) res.send(err);
                    res.send(result3);
                });
            });
        });
    }},

    async findDevTime (req,res) {
        await accessDB(`SELECT * FROM Developers WHERE name = '${req.body.name}'`, async (result,err) => {
            await accessDB(`SELECT * FROM Time WHERE DeveloperID = ${result[0].DeveloperID}`, (result2, err) => {
                const totalTime = result2.reduce((counter, iteration) => {
                    return (counter + ((iteration.end_time - iteration.start_time)/3600000));
                }, 0);
                res.send(totalTime.toString());
            });
        });
    },

    async findProjectTime (req,res) {
        await accessDB(`SELECT * FROM Projects WHERE name = '${req.body.name}'`, async (result,err) => {
            await accessDB(`SELECT * FROM Time WHERE ProjectID = ${result[0].ProjectID}`, (result2, err) => {
                const totalTime = result2.reduce((counter, iteration) => {
                    return (counter + ((iteration.end_time - iteration.start_time)/3600000));
                }, 0);
                res.send(totalTime.toString());
            });
        });
    },

    async filterTop5Devs (req,res) {
        await accessDB(`SELECT * FROM Time WHERE start_time BETWEEN '${req.body.start_time}' AND '${req.body.end_time}'`, async (result,err) => {
            const devTime = result.map((entry) => {
                return [entry.DeveloperID, ((entry.end_time - entry.start_time)/3600000)/5]; // Relaciona DeveloperID com o tempo total em horas, em uma tabela na variável devTime.
            });
            const getDevIDs = result.map((entry) => {
                return entry.DeveloperID;                      // Pega todos os DeveloperIDs das entradas de tempo
            });
            const uniqueSet = new Set(getDevIDs);              // Remove os IDs duplicados usando SET
            const devIDs = [...uniqueSet];                     // Retorna o SET para um formato de Array
            var counter = 0;                                    // Declara o contador antes para evitar problemas durante os loops
            var totalTime = [];                                // Declara o array final antes para usar o .push
            devIDs.forEach(devID => {                          // Para cada ID único... (Pode ser nenhum, podem ser muitos)
                for(i=0; i < devTime.length; i++){             // ... rotaciona toda a tabela de dados com os tempos... (também não sabemos o tamanho)
                        if(devTime[i][0] === devID) {          // ... em cada rotação interna do for compara se o ID do dev (posição 0 da tabela devTime) é igual ao ID único do dev na rotação externa do foreach...
                            counter = counter + devTime[i][1]; // ... se o id for igual, acumula no contador as horas do dev da tabela de entrada de horas, acessado pela posição 1 da tabela "devTime"
                        }
                }
                totalTime.push([devID,counter]);               // Em cada rotação do foreach, empurra o devID único da rotação e o contador de horas desse dev na nova tabela.
                counter = 0;                                   // Reseta o contador para a próxima acumulação de horas.
            });                           // O resultado final é uma tabela onde, independente do tanto de ids e entradas de horas que forem encontrados, a tabela nova chamada...
                                          // ... total time contém em cada posição o primeiro valor sendo o ID único do dev e o segundo valor o tempo em horas acumulado do dev.
            totalTime.sort((a,b) => {
                return b[1]-a[1];         // Organiza o array da maior contagem de horas para a menor.
            });
            await accessDB('SELECT * FROM Developers', (result,err) => {
                result.forEach(result => {
                    for(i=0;i<5;i++){
                        if(result.DeveloperID === totalTime[i][0]) {  
                            totalTime[i][0] = result.name;
                        }
                    }
                });
            console.log(totalTime);
            res.send(`O ranking de devs da semana é esse: 1 - ${totalTime[0][0]} com ${totalTime[0][1]} horas em média. 2 - ${totalTime[1][0]} com ${totalTime[1][1]} horas em média. 3 - ${totalTime[2][0]} com ${totalTime[2][1]} horas em média. 4 - ${totalTime[3][0]} com ${totalTime[3][1]} horas em média. 5 - ${totalTime[4][0]} com ${totalTime[4][1]} horas em média.`);
            });
        });
    },

    async remove (req,res) {
        await accessDB(`DELETE FROM Time WHERE EntryID = ${req.body.EntryID}`, (result, err) => {
            if (err !== null) res.send(err);
            res.send(result);
        });
    }
};