const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const routes = require('./Routes/routes');
const layer0Routes = require('./Routes/layer0.routes');
const layer1Routes = require('./Routes/layer1.routes');
const layer2Routes = require('./Routes/layer2.routes');

dotenv.config();
app.use(cors());

app.use(routes);
app.use('/layer0', layer0Routes);
// app.use('/layer1', layer1Routes);
// app.use('/layer2', layer2Routes);

process.on('uncaughtException', (err) => {
    console.log(err);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(err.status || 404).json({
        message: 'No such route exists',
    });
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        message: 'Error',
    });
});