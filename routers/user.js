const router = require("express").Router();
const Users = require("./usermodel.js");

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

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
});

module.exports = router;
