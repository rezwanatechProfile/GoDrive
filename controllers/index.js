const express = require('express');
const router = express.Router()

//HOME
router.get("/", (req,res)=> {
  res.render("home.ejs", {
 })
});

module.exports = router