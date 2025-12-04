const devicesRouter = require('./devicesRouter');
const readingsRouter = require('./readingsRouter');
const sensorsRouter = require('./sensorsRouter');
const usersRouter = require('./usersRouter');
const zonesRouter = require('./zonesRouter');

function routerApi(app){
    app.use('/devices', devicesRouter);
    app.use('/readings', readingsRouter);
    app.use('/sensors', sensorsRouter);
    app.use('/users', usersRouter);
    app.use('/zones', zonesRouter);
}

module.exports = routerApi;
