const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');
const mongoose = require('mongoose');
const { Connection } = require('mongoose');
const connection = mongoose.connection;

app.set('port', (process.env.port || 3000));

app.use(cors());
app.use('/api/v1', api);
app.use((req, res) => {
    const err = new Error('404 - Not found !!!');
    err.Status = 500;
    res.json({msg: '404 - Not found !!!', err: err})
});

mongoose.connect('mongodb://localhost:27017/whiskycms', {useNewUrlParser: true, useUnifiedTopology: true});
connection.on('error', (err) => {
    console.error(`Connection to MongoDB error : ${err.msg}`);
});

connection.once('open', () => {
    console.log('Connected to MongoDB');

    app.listen(app.get('port'), () => {
        console.log(`Express serve listening on port ${app.get('port')}`);
    });
});

