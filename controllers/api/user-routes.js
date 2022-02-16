const router = require('express').Router();
const { User, Link, Profile} = require('../../models');
const withAuth = require('../../utils/auth');

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
router.get('/',withAuth, (req, res) => {
    User.findOne({
      attributes: { exclude: ['password','email'] },
      where:{
        id: req.session.user_id
      }, 
      include: [
        {
        model:Profile,
        attributes: ['firstname', 'lastname','description']
    },
    {
      model: Link,
      attributes: ['link_url_facebook', 'link_url_twitter', 'link_url_linkedin', 'link_url_github', 'link_url_intagram']
    }
  ],
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        console.log(userData);
        res.render('user-profile',{users:dbUserData})
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // ---------------------------------------------------------------------------------------------------------------


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
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});
// ---------------------------------------------------------------------------------------------------------------------------


  // PUT /api/users/1
router.put('/:id', (req, res) => {
    
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
        req.session.destroy();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  module.exports = router;