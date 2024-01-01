const server = require('./server');

/* ---------------------------- Server Connection --------------------------- */
const PORT = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';

server.listen(PORT, host, () => {
    console.log(`http://localhost:${PORT}`)
})

