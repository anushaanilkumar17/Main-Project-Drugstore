const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
const port = 3000;
const path = require('path');
const app = new express;
app.use('/public/img', express.static(path.join(__dirname,'/public/img')));

// const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api', api);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});

