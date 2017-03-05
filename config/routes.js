const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.get('/map', (req, res) => res.render('statics/map'));

router.route('/profile')
  .get(secureRoute, users.show);

router.route('/profile/edit')
  .get(secureRoute, users.edit);

router.all('*', (req, res) => res.notFound());

module.exports = router;
