var config = {
port: 3000,
secret: 'secret',
redisUrl: 'redis://localhost:6379',
routes: {
login: '/login',
logout: '/logout'
}
};
module.exports = config;