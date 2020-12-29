// Initialize .env
require('dotenv').config()

// Require dependencies
const fs = require('fs/promises')
const redis = require('./util/redis')

// Function to read the file and store it in redis
async function readAndStoreImage() {
  // Read the file
  const image = await fs.readFile('./image.png')

  // Convert the file buffer to a JSON string
  const bufferString = JSON.stringify(image)
  // Set the key and set expire of 1 hour
  return redis.set('exampleKey', bufferString, 'EX', 3600)
}

async function readRedisAndCreateFile() {
  // Read the key from redis
  const image = await redis.get('exampleKey')
  // Convert it into a readable object
  const imageObj = JSON.parse(image)

  // Convert the image back into a buffer
  const imageBuffer = Buffer.from(imageObj.data)

  // Write the file to an ouput
  await fs.writeFile('./output.png', imageBuffer)
  return process.exit(0)
}

// Execute functions
readAndStoreImage().then(readRedisAndCreateFile)
