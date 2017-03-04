const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');

User.collection.drop();

User
  .create([{
    username: 'cooldude',
    firstName: 'Mike',
    lastName: 'Hayden',
    email: 'mike.hayden@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }])

  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
