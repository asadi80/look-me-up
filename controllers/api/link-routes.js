const router = require('express').Router();
const { Link, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Link.findAll({
      attributes: ['id', 'link_url', 'title', 'created_at'],
      order: [['created_at', 'DESC']], 
      include: [
        {
          model: User,
          attributes: ['id']
        }
      ]
    })
      .then(dbLinktData => res.json(dbLinktData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// ---------------------------------------------------------------------------
router.get('/:id', (req, res) => {
    Link.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'link_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['id']
        }
      ]
    })
      .then(dbLinktData => {
        if (!dbLinktData) {
          res.status(404).json({ message: 'No link found with this id' });
          return;
        }
        res.json(dbLinktData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // ---------------------------------------------------------------------------
  //POST /api/links
  router.post('/', (req, res) => {
      // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
      Link.create({
       
        title: req.body.title,
        link_url: req.body.link_url,
        user_id: req.body.user_id
      })
        .then(dbLinktData => res.json(dbLinktData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  // ---------------------------------------------------------------------------
  // update links
  router.put('/:id', (req, res) => {
    Link.update(
      {
        title: req.body.title,
        link_url: req.body.link_url
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbLinktData => {
        if (!dbLinktData) {
          res.status(404).json({ message: 'No link found with this id' });
          return;
        }
        res.json(dbLinktData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // ---------------------------------------------------------------------------

  // delete link
  router.delete('/:id', (req, res) => {
    Link.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbLinktData => {
        if (!dbLinktData) {
          res.status(404).json({ message: 'No link found with this id' });
          return;
        }
        res.json(dbLinktData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;