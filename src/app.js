import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser';
import express from 'express'
import { getUserById , addUsers , getUsers} from './data/user.data'
import { getCompany , addCompany , getCompanyByUser } from './data/company.data'

import cors from 'cors'

const app = express()
const PORT = 8880


app.use(cors())

const typeDefs = `
type Company {
  id:Int
  name:String
  users:[User]
}
type User {
  id:Int
  firstName:String
  lastName:String
  fullName:String
  email:String
  company:Company
}
input CreateUserInput {
  id: Int
  firstName: String
  lastName: String
  email: String
}
input CreateCompanyInput {
  id: Int
  name: String
  userId: [Int]
}
type Mutation {
  createUser(createUserInput: CreateUserInput) : User
  createCompany(createCompanyInput: CreateCompanyInput) : Company
}
type Query {
  something: String
  user(id: Int) : User
  users : [User]
  companies: [Company]
}
schema {
  query: Query
  mutation: Mutation
}
  `

const resolvers = {
    Query: {
        user(root,{id}){
            return getUserById(id)
        },
        users(){
            return getUsers()
        },
        companies(){
            return getCompany()
        }
    },
    Mutation: {
        createUser(root,{createUserInput}) {
            const user = addUsers(createUserInput)
            return user
        },
        createCompany(root,{createCompanyInput}) {
            const company = addCompany(createCompanyInput)
            console.log(company)
            return company
        }
    },
    Company: {
        users(company){
            return company.userId.map(userId=> getUserById(userId))  
        }
    },
    User: {
        company(user){
            return getCompanyByUser(user.id)
        }
    }
}


const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))