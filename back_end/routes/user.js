module.exports = function(app){
    var users = require('../controllers/user');
    app.get('/user', users.findAll);
    app.get('/user/:id', users.findById);
    app.post('/user', users.add);
    app.put('/user/:id', users.update);
    app.delete('/user/:id', users.delete);
}