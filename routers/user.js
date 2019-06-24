const router = require("express").Router();
const Users = require("./usermodel.js");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  let user = req.body;

  if (!user.username || !user.password || !user.country_id) {
    res.status(404).json({
      error: "You need to send username, password and isAdmin/CountryId"
    });
  }

  Users.findBy({ username: user.username }).then(user => {
    if (user.length) {
      res.status(200).json({ error: "User already exist" });
    }
  });
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          id: user.id,
          isAdmin: user.isAdmin
        });
      } else {
        res.status(401).json({ message: "I Shall not pass" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
