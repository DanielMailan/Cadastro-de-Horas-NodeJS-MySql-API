const express = require('express');
const routes = express.Router();

const DevelopersController = require('./controllers/DevelopersController.js');
const ProjectsController = require('./controllers/ProjectsController.js');
const TimeController = require('./controllers/TimeController.js');

routes.get('/test', (req,res) => {
    res.send('App is working');
});

routes.get('/developer', DevelopersController.index);
routes.get('/developer/:id', DevelopersController.show);
routes.post('/developer', DevelopersController.insert);
routes.put('/developer', DevelopersController.update);
routes.delete('/developer', DevelopersController.remove);

routes.get('/project', ProjectsController.index);
routes.get('/project/:id', ProjectsController.show);
routes.post('/project', ProjectsController.insert);
routes.put('/project', ProjectsController.update);
routes.delete('/project', ProjectsController.remove);

routes.get('/time', TimeController.index);
routes.get('/time/developer', TimeController.findDevTime);
routes.get('/time/project', TimeController.findProjectTime);
routes.get('/time/top5devs', TimeController.filterTop5Devs);
routes.post('/time', TimeController.insert);
routes.delete('/time', TimeController.remove);

module.exports = routes;