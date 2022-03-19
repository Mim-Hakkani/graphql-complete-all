const graphql = require('graphql')
const _ = require("lodash");
const Book =require('../Models/Book.js')
const Author =require('../Models/Author.js')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
}=graphql;


// dummy data
// var books = [
//   { name: "book1", genre: "gener1", id: "1", authorId: "1" },
//   { name: "book2", genre: "gener1", id: "2", authorId: "2" },
//   { name: "book3", genre: "gener2", id: "3", authorId: "3" },
//   { name: "book4", genre: "gener3", id: "4", authorId: "2" },
//   { name: "book5", genre: "gener2", id: "5", authorId: "1" },
// ];

// var authors = [
//   { name: "author1", age: 32, id: "1" },
//   { name: "author2", age: 87, id: "2" },
//   { name: "author3", age: 43, id: "3" },
// ];



//create a book type 

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                //  return _.find(authors, { id: parent.authorId });
            }
        }
    })
})


//create a author type 

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:GraphQLString},
        age:{type:graphql.GraphQLInt},
        books:{
            type:new graphql.GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
            }
        }
    })
})



const RootQuery =new GraphQLObjectType({
    name:'RootQueryType',
    fields:{


    //create schema for all books 
        books:{
            type:new graphql.GraphQLList(BookType),
            resolve(parent,args){
                // return books
            }
        },


    //create schema for all authors 

    authors:{
        type:new graphql.GraphQLList(AuthorType),
        resolve(parent,args){
            // return authors
        }
    },

        // book schema  by id 

        book:{
            type:BookType,
            args:{id:{type:graphql.GraphQLID}},
            resolve(parent,args){
            //   return _.find(books, { id: args.id });
            }
        },


        //author schema by id 

        author:{
            type:AuthorType,
            args:{id:{type:graphql.GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id})
            }
        }
    }
})



/***************************** *
  Mutation Part  => add ,edit/update ,delete  apis  
********************************/ 

const Mutation = new GraphQLObjectType({
    name:'Mutaion',
    fields:{
            addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        age: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    }
    }
    
})


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation,
})


