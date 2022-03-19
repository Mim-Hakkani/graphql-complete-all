const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const Schema = require('./Schema/Schema');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express()
const port = 8000

app.use(cors());

//connect to mongodb

mongoose.connect(
  `mongodb+srv://graphQLPracticeUser:j71p7z32Rfzb2Ris@cluster0.0om44.mongodb.net/graphQLPractice?retryWrites=true&w=majority
  
  `
);
mongoose.connection.once("open", () => {
  console.log("connected to DB by mim hakkani");
});


app.use('/graphql', graphqlHTTP({
 schema:Schema,
 graphiql:true
}));


app.get('/', (req, res) => {
  res.send('Graphql hellow world !!')
})

app.listen(port, () => {
  console.log(`Run the server listening on port ${port}`)
})