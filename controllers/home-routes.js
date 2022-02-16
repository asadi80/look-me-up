const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const {  User, Link, Profile } = require('../models');

// gome route
router.get('/', (req, res) => {
      res.render('homepage')
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
 // fetching profile and links by user id  for public 
router.get('/user/:id',(req, res)=>{
  
 User.findOne({
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
    attributes: ['link_url_facebook', 'link_url_twitter', 'link_url_linkedin', 'link_url_github', 'link_url_intagram','link_url_youtube']
  }
],
    raw : true
  }).then(([userData])=>{
    if (!Profile.firstname) {

      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    console.log(userData);
    const data= {
    profiles_firstname: userData['profiles.firstname'],
    profiles_lastname: userData['profiles.lastname'],
    profiles_description:userData['profiles.description'],
    links_link_url_facebook: userData['links.link_url_facebook'],
    links_link_url_twitter: userData['links.link_url_twitter'],
    links_link_url_linkedin: userData['links.link_url_linkedin'],
    links_link_url_intagram:userData['links.link_url_intagram'],
    links_link_url_youtube:userData['links.link_url_youtube'],
    links_link_url_github:userData['links.link_url_github'],
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
        attributes: ['firstname', 'lastname','description','user_id']
    },
    {
      model: Link,
      attributes: ['link_url_facebook', 'link_url_twitter', 'link_url_linkedin', 'link_url_github', 'link_url_intagram','link_url_youtube']
    }
  ],
  raw : true
    })
      .then(userProfileData => {
        console.log(userProfileData);
        const data= {
          profiles_firstname: userProfileData['profiles.firstname'],
          profiles_lastname: userProfileData['profiles.lastname'],
          profiles_description:userProfileData['profiles.description'],
          profiles_user_id: userProfileData['profiles.user_id'],
          links_link_url_facebook: userProfileData['links.link_url_facebook'],
          links_link_url_twitter: userProfileData['links.link_url_twitter'],
          links_link_url_linkedin: userProfileData['links.link_url_linkedin'],
          links_link_url_intagram:userProfileData['links.link_url_intagram'],
          links_link_url_youtube:userProfileData['links.link_url_youtube'],
          links_link_url_github:userProfileData['links.link_url_github'],
        
          }
        res.render('user-profile',{users:data,loggedIn:true})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// ------------------------------------------------------------------------------------------
// edit user profile info
  router.get('/edit-profile', withAuth, (req, res) => {
    User.findOne({
      attributes: { exclude: ['password','email'] },
      where:{
        id: req.session.user_id
      }, 
      include: [
        {
        model:Profile,
        attributes: ['firstname', 'lastname','description','user_id']
    },
    {
      model: Link,
      attributes: ['link_url_facebook', 'link_url_twitter', 'link_url_linkedin', 'link_url_github', 'link_url_intagram','link_url_youtube']
    }
  ],
  raw : true
    })
      .then(userProfileData => {
        console.log(userProfileData);
        const data= {
          profiles_firstname: userProfileData['profiles.firstname'],
          profiles_lastname: userProfileData['profiles.lastname'],
          profiles_description:userProfileData['profiles.description'],
          profiles_user_id: userProfileData['profiles.user_id'],
          links_link_url_facebook: userProfileData['links.link_url_facebook'],
          links_link_url_twitter: userProfileData['links.link_url_twitter'],
          links_link_url_linkedin: userProfileData['links.link_url_linkedin'],
          links_link_url_intagram:userProfileData['links.link_url_intagram'],
          links_link_url_youtube:userProfileData['links.link_url_youtube'],
          links_link_url_github:userProfileData['links.link_url_github'],
          }
        res.render('edit-user-info',{users:data,loggedIn:true})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  
  
module.exports = router;