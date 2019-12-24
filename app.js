require('dotenv').config();

const express= require('express'),
  PORT = process.env.PORT || 3000,
  cors = require('cors'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  routes = require('./routes'),
  { errorHandler } = require('./middlewares'),
  app = express()
  
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(data => console.log(`MongoDb now is connected`))
  .catch(console.log)

app.use('/', routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening ON PORT ${PORT}`))