const User = require('../models/user');

function showRoute(req, res) {
  res.render('users/show');
}

function editRoute(req, res) {
  res.render('users/edit');
}

function createEventRoute(req, res, next){
  User.findById(req.user.id)
  .exec()
  .then((user)=>{
    user.events.push(req.body);
    user.save();
  })
  .then(() => res.redirect('/profile'))
  .catch(next);
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

// function newImageRoute(req, res) {
//   res.render('users/newImage');
// }
//
// function createImageRoute(req, res, next) {
//   if(req.file) req.body.filename = req.file.key;
//
//   // For some reason multer's req.body doesn't behave like body-parser's
//   req.body = Object.assign({}, req.body);
//
//   req.user.images.push(req.body);
//
//   req.user
//     .save()
//     .then(() => res.redirect('/user'))
//     .catch((err) => {
//       console.log(err);
//       if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
//       next(err);
//     });
// }

function updateRoute(req, res, next) {
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  return req.user.save()
    .then(() => res.redirect('/profile'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/profile', err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  req.user.remove()
    .then(() => res.redirect('/users'))
    .catch(next);
}

function deleteEventRoute(req, res, next) {
  const event = req.user.events.id(req.params.id);

  if(!event) return res.notFound();

  event.remove();

  req.user.save()
    .then(() => res.redirect('/profile'))
    .catch(next);

}

module.exports = {
  show: showRoute,
  //newImage: newImageRoute,
  //createImage: createImageRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createEvent: createEventRoute,
  deleteEvent: deleteEventRoute
};
