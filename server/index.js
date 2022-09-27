require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var Cron = require('cron').CronJob

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const colorRoutes = require('./routes/color')
const sizeRoutes = require('./routes/size')
const categoryRoutes = require('./routes/category')
const tokenRoutes = require('./routes/token')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const cartRoutes = require('./routes/cart')
const adminRoutes = require('./routes/admin')
const ladingpageRoutes = require('./routes/ladingpage')
const Tokens = require('./models/Token')

//Crons Jobs
const tokensCronJob = require('./crons/tokens')

const { PORT } = require('./config/constants')

const app = express()

app.use(morgan('tiny'))
app.use(cors())

//Body Parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

//Connecting to routes
app.use(express.static('public/uploads'))
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/color', colorRoutes)
app.use('/api/size', sizeRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/token', tokenRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/landingpages', ladingpageRoutes)
// Connect to MongoDB
const ip = 'localhost'
const portNumber = process.env.portNumber || 27017
const appDB = 'bitlyra'

let mongoUri;

if (process.env.APP_ENV && process.env.APP_ENV === 'production') {
  mongoUri = process.env.MONGODB_URI + "&tlsCAFile=" + __dirname + "/config/ca-certificate.crt"
} else {
  mongoUri =
    process.env.MONGODB_URI || 'mongodb://' + ip + ':' + portNumber + '/' + appDB
}

console.log(mongoUri)
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo instance...')
})
mongoose.connection.on('error', err => {
  console.log('Error connecting to mongo', err)
})

//Server running
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}...`)
})

//Seed tokens
const { USDT_ABI, WETH_ABI } = require('./utils/abi')
const tokensSeed = async () => {
  const tokens = [
    new Token({
      name: 'Ethereum',
      symbol: 'WETH',
      contract: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      abi: WETH_ABI,
      price: 0,
      status: 'Enable'
    }),
    new Token({
      name: 'Tether',
      symbol: 'USDT',
      contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      abi: USDT_ABI,
      price: 0,
      status: 'Enable'
    })
  ]
  const count = await Tokens.countDocuments()

  if (count == 0) {
    for (let i = 0; i < tokens.length; i++) {
      tokens[i].save()
    }
  }
}

const User = require('./models/User')
const bcrypt = require("bcrypt");
const UserSeed = async () => {
  const isEmailExist = await User.findOne({ email: "admin@admin.com" })
  let Id = isEmailExist._id
  if (!isEmailExist) {
    const user = new User({
      firstName: "Admin",
      username: "Admin",
      email: "admin@admin.com",
      password: "testtest",
      role: "Admin"
    })
    await user.save()
  } else {
    let salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash('testtest', salt);
    await User.findByIdAndUpdate({ _id: Id }, { password: newPassword })
  }
}

tokensSeed()
UserSeed()

///Setting up a cron job
//for tokens price update
//runs every 1 hours * 1 * * *
var tokensJob = new Cron('* 1 * * *', function () {
  console.log('[Tokens CRON] Started!')
  tokensCronJob()
})

tokensJob.start()
