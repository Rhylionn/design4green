const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const db = require("./core/database")

dotenv.config()

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT,
  })
)

app.use("/formations", require("./routes/formations"))

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
