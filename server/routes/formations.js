const express = require("express")
const router = express.Router()

const Formation = require("../models/Formation")

router.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json")

  Formation.find()
    .lean()
    .exec((err, docs) => {
      res.end(JSON.stringify(docs))
    })
})

module.exports = router
