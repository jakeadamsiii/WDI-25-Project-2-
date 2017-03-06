const User = require('../models/user');

function showRoute(req, res) {
  res.render('users/show');
}

function editRoute(req, res) {
  res.render('users/edit');
}

// function editRoute(req, res, next) {
//   User
//     //.findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) res.notFound();
//       res.render('users/edit', { user });
//     })
//     .catch(next);
// }

function newImageRoute(req, res) {
  res.render('users/newImage');
}

function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/user'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.redirect('/users'))
    .catch(next);
}

module.exports = {
  show: showRoute,
  newImage: newImageRoute,
  createImage: createImageRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
