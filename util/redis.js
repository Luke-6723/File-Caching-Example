const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient({ host: process.env.REDIT_HOST, port: process.env.REDIS_PORT, password: process.env.REDIS_PASS, db: 1 });

['get', 'set', 'del', 'ttl'].forEach(command => {
  client[command] = promisify(client[command]).bind(client)
})

module.exports = client
