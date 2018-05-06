
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//const port = 3000;
const port = process.env.PORT || 8080;

// parse income body middleware
app.use(bodyParser.json())
app.use(cors());

// routes go here
// redirect any request to only valid url path
app.get('/api/whoami',(req, res, next) => {

    // software
    let str_userAgent = req.headers['user-agent'];
    var software = str_userAgent.substring( str_userAgent.indexOf( '(' ) + 1, str_userAgent.indexOf( ')' ) );

    // language
    let language = req.headers['accept-language'].split(",")[0];
    console.log(language);

    // ip address
    var remoteAddress = req.connection.remoteAddress;
    console.log(remoteAddress);

    browserInfo = {
        ipaddress: remoteAddress,
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