const express = require('express');
const app = express();
const api = require('./api/v1/index');

app.set('port', (process.env.port || 3000));

app.use('/api/v1', api);

app.listen(app.get('port'), () => {
    console.log(`Express serve listening on port ${app.get('port')}`);
});

