const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const app = express()
const port = 8000


// var { buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String,
//     name:String,
//     id:String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
//   name:()=>{
//       return 'golam hkkani mim'
//   }
// };


app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
}));


app.get('/', (req, res) => {
  res.send('Graphql hellow world !!')
})

app.listen(port, () => {
  console.log(`Run the server listening on port ${port}`)
})