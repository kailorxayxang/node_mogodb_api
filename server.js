const app = require('./app');
const http = require('http').Server(app);
const configs = require('./config/secret');

http.listen(configs.port, (err) => {
 if (err) console.log(err);
 console.log(`Server running on ${configs.port}`);
});