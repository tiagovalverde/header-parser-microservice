
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// routes
app.get('/api/whoami',(req, res, next) => {

    var software = req.headers['user-agent'].split(') ')[0].split(' (')[1];
    let language = req.headers['accept-language'].split(",")[0];
    let ipaddress = req.headers['x-forwarded-for'] || 
             req.connection.remoteAddress || 
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;

    browserInfo = {
        ipaddress,
        language,
        software
    }
    res.json(browserInfo);
});

// invalid requests 
app.get('*', (req, res) => {
    res.json({
        sucess: false,
        message: 'Invalid request'
    });
});

app.listen(port, () => {
    console.log('Server started on port:' + port);
});