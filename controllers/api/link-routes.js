const router = require('express').Router();
const { Link, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
    Link.findAll({
      // attributes: ['id', 'link_url', 'title', 'created_at'],
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
      // attributes: ['id', 'link_url', 'title', 'created_at'],
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
  router.post('/',withAuth, (req, res) => {
      // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
      Link.create({
       
        link_url_facebook: req.body.link_url_facebook,
        link_url_twitter: req.body.link_url_twitter,
        link_url_linkedin:req.body.link_url_linkedin,
        link_url_github:req.body.link_url_github,
        link_url_intagram:req.body.link_url_intagram,
        link_url_youtube:req.body.link_url_youtube,
        user_id: req.session.user_id
      })
        .then(dbLinktData => res.json(dbLinktData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  // ---------------------------------------------------------------------------
  // update links
  router.put('/:id',withAuth, (req, res) => {
    Link.update(
      {
        link_url_facebook: req.body.link_url_facebook,
        link_url_twitter: req.body.link_url_twitter,
        link_url_linkedin:req.body.link_url_linkedin,
        link_url_github:req.body.link_url_github,
        link_url_intagram:req.body.link_url_intagram,
        link_url_youtube:req.body.link_url_youtube,
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
  router.delete('/:id', withAuth,(req, res) => {
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