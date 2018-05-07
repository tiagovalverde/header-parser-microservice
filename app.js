
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//const port = 3000;
const port = process.env.PORT || 3000;

// parse income body middleware
app.use(bodyParser.json())
app.use(cors());

// routes go here
// redirect any request to only valid url path
app.get('/api/whoami',(req, res, next) => {

    var software = req.headers['user-agent'].split(') ')[0].split(' (')[1]
    let language = req.headers['accept-language'].split(",")[0];
    let ipAddress = req.headers['x-forwarded-for'] || 
             req.connection.remoteAddress || 
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;

    browserInfo = {
        ipAddress,
        language,
        software
    }
    res.json(browserInfo);
});

// redirect invalid requests 
app.get('*', (req, res) => {
    //res.send('Invalid request')
    res.json({
        sucess: false,
        message: 'Invalid request'
    });
});

app.listen(port, () => {
    console.log('Server started on port:' + port);
    
});