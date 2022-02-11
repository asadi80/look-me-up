const router = require('express').Router();
const { User} = require('../../models');
// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] }
      })
    
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
//   --------------------------------------------------------------------------------------------

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // ---------------------------------------------------------------------------------------------------------------
// router.post('/signup', (req, res) => {
//   // expects {username: 'name', email: 'name@gmail.com', password: 'password1234'}
//   User.create({
   
//     email: req.body.email,
//     password: req.body.password
//   })
//     .then(userData => {
//       req.session.save(() => {
//         req.session.user_id = userData.id;
       
//         req.session.loggedIn = true;
//         res.json(userData);
//       });
//     })
// });
//   ------------------------------------------------------------------------------------------------


// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
     
      email: req.body.email,
      password: req.body.password
    })
    .then(userData => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        res.json(userData);
      });
    })
  });
  //   ------------------------------------------------------------------------------------------------

  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(userData => {
      if (!userData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    });
  });
 //   ------------------------------------------------------------------------------------------------
 // logout
 router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// ---------------------------------------------------------------------------------------------------------------------------


  // PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
    //   ------------------------------------------------------------------------------------------------

    // DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  module.exports = router;