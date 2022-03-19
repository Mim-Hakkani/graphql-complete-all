const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Graphql hellow world !!')
})

app.listen(port, () => {
  console.log(`Run the server listening on port ${port}`)
})