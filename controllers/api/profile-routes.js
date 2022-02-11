const router = require('express').Router();
const { Profile,User} = require('../../models');
// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Profile.findAll({
      // attributes: ['id', 'link_url', 'title', 'created_at'],
      order: [['created_at', 'DESC']], 
      include: [
        {
          model: User,
          attributes: ['id']
        }
      ]
    })
      .then(dbProfileData => res.json(dbProfileData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
//   --------------------------------------------------------------------------------------------

// GET /api/users/1
router.get('/:id', (req, res) => {
  Profile.findOne({
    // attributes: ['id', 'link_url', 'title', 'created_at'],
    where: {
      id: req.params.id
    },
    order: [['created_at', 'DESC']], 
    include: [
      {
        model: User,
        attributes: ['id']
      }
    ],
    
  })
    .then(dbProfileData => res.json(dbProfileData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
//   ------------------------------------------------------------------------------------------------


// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    Profile.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      description: req.body.description
    })
    .then(dbProfileData => res.json(dbProfileData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });
  //   ------------------------------------------------------------------------------------------------

  // PUT /api/users/1
  router.put('/:id', (req, res) => {
    Profile.update(
      {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      description: req.body.description
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbProfileData => {
        if (!dbProfileData) {
          res.status(404).json({ message: 'No profile found with this id' });
          return;
        }
        res.json(dbProfileData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
    //   ------------------------------------------------------------------------------------------------

    // DELETE /api/users/1
router.delete('/:id', (req, res) => {
    Profile.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbProfileData => {
        if (!dbProfileData) {
          res.status(404).json({ message: 'No profile found with this id' });
          return;
        }
        res.json(dbProfileData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  module.exports = router;