const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Link, Profile } = require('../models');

router.get('/', (req, res) => {
      res.render('homepage')
});
// ------------------------------------------------------------------------------------------

router.get('/profile', (req, res) => {

  if (req.session.loggedIn) {
    res.render('profile');
    return;
  }
  res.redirect('/login');
 
});
// ------------------------------------------------------------------------------------------
router.get('/user/:id',(req, res)=>{
  //to do fetch this user id information
  Link.findAll({
    where:{
      user_id: req.params.id
    },
    
    raw : true

  }).then(linkData=>{
    console.log(linkData);
    res.render('user',{links:linkData[0]})
  })
})
router.get('/user', (req, res) => {
  // res.render('user'.)

});
// ------------------------------------------------------------------------------------------

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('user');
      return;
    }
    res.render('login');
  });
  // ------------------------------------------------------------------------------------------

  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

    // ------------------------------------------------------------------------------------------

  router.get('/signup', (req, res) => {
    res.render('signup');
});
  // ------------------------------------------------------------------------------------------

  
  
module.exports = router;