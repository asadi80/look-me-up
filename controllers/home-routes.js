const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const {  User, Link, Profile } = require('../models');

// gome route
router.get('/', (req, res) => {
      res.render('homepage',{loggedIn:req.session.loggedIn})
});
// ------------------------------------------------------------------------------------------
//profile route
router.get('/profile',withAuth, (req, res) => {

  if (req.session.loggedIn) {
    res.render('profile');
    return;
  }
  res.redirect('/login');
 
});
// ------------------------------------------------------------------------------------------
 // fetching profile and links by user id 
router.get('/user/:id',(req, res)=>{
 
 User.findAll({
  attributes: { exclude: ['password','email'] },
    where:{
      id: req.params.id
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
    raw : true
  }).then(([userData])=>{
   
    console.log(userData);
    const data= {
    profiles_firstname: userData['profiles.firstname'],
    profiles_lastname: userData['profiles.lastname'],
    profiles_description:userData['profiles.description'],
    links_link_url_facebook: userData['links.link_url_facebook'],
    links_link_url_twitter: userData['links.link_url_twitter'],
    links_link_url_linkedin: userData['links.link_url_linkedin'],
    links_link_url_intagram:userData['links.link_url_intagram'],
    }
    console.log(data);
    res.render('user',{users:data})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

// ------------------------------------------------------------------------------------------
// login route
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/user_profile');
      return;
    }
    res.render('login');
  });
// ------------------------------------------------------------------------------------------
//  logout route
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
 //signup route

  router.get('/signup', (req, res) => {
    res.render('signup');
});
  // ------------------------------------------------------------------------------------------
  router.get('/user_profile',withAuth, (req, res) => {
    if(!req.session.loggedIn )  return res.redirect('/login')
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
        console.log(dbUserData);
        res.render('user-profile',{users:dbUserData})
       
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  
module.exports = router;