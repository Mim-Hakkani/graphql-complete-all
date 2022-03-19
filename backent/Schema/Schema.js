const graphql = require('graphql')
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
}=graphql;


// dummy data
var books = [
  { name: "book1", genre: "gener1", id: "1", authorId: "1" },
  { name: "book2", genre: "gener1", id: "2", authorId: "2" },
  { name: "book3", genre: "gener2", id: "3", authorId: "3" },
  { name: "book4", genre: "gener3", id: "4", authorId: "2" },
  { name: "book5", genre: "gener2", id: "5", authorId: "1" },
];

var authors = [
  { name: "author1", age: 32, id: "1" },
  { name: "author2", age: 87, id: "2" },
  { name: "author3", age: 43, id: "3" },
];



//create a book type 

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
    })
})


//create a author type 

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:GraphQLString},
        age:{type:graphql.GraphQLInt},
    })
})



const RootQuery =new GraphQLObjectType({
    name:'RootQueryType',
    fields:{

        // book schema  by id 

        book:{
            type:BookType,
            args:{id:{type:graphql.GraphQLID}},
            resolve(parent,args){
              return _.find(books, { id: args.id });
            }
        },


        //author schema by id 
        
        author:{
            type:AuthorType,
            args:{id:{type:graphql.GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query:RootQuery
})


