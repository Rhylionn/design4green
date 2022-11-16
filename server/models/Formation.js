const mongoose = require("mongoose")

const formationSchema = mongoose.Schema(
  {
    typeFormation: String,
    Structure: String,
    programDescription: String,
    organismeType: String,
    formationName: String,
    structLoc: String,
    isValidate: String,
    duration: Number,
    access: String,
    url: String,
  },
  { collection: "formations" }
)

module.exports = mongoose.model("Formation", formationSchema)
