const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const compression = require("compression")

dotenv.config()

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT,
  })
)

app.use(compression())

app.use("/formations", require("./routes/formations"))

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
