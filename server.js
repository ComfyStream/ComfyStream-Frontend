const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/Comfy-Stream-frontend'));
app.get('*', function(req, res) {
    res.sendFile(`./Comfy-Stream-frontend/dist/index.html`);
});
app.listen(process.env.PORT || 8080);