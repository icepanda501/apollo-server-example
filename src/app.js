import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser';
import express from 'express'
import userData from './data/user.data'
import companyData from './data/company.data'

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
            return userData.getUserById(id)
        },
        users(){
            return userData.getUsers()
        },
        companies(){
            return companyData.getCompanies()
        }
    },
    Mutation: {
        createUser(root,{createUserInput}) {
            const user = userData.addUser(createUserInput)
            return user
        },
        createCompany(root,{createCompanyInput}) {
            const company = companyData.addCompany(createCompanyInput)
            return company
        }
    },
    Company: {
        users(company){
            return userData.getUsersByCompanyId(company.id)  
        }
    },
    User: {
        fullName(user){
            console.log(user)
            return `${user.firstName} ${user.lastName}`
        },     
        company(user){
            return companyData.getCompanyById(user.companyId)
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