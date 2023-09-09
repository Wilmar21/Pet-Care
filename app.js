import { ApolloServer,gql } from "apollo-server";
import axios from "axios";

const typeDefs = gql`
    type Pet{
        _id: String!
        name: String!
        image: String!
        race: String!
        age: String!
        size: String!
        appointments: [String!]
        createdAt: String!
        updateAt: String!
    }

    type Appointment{
        _id: String!
        date: String!
        hour: String!
        type: String!
        pet: String!
        createdAt: String!
        updateAt: String!
    }

    type Query{
        allPets: [Pet]
        allAppointments: [Appointment]
    }
`

const resolvers = {
    Query: {
        allPets: async (parent,args) => {
            const {data: Pets} = await axios.get('https://petbackend.vercel.app/pet')

            return Pets
        },
        allAppointments: async (parent,args) => {
            const {data: Appointments} = await axios.get('https://petbackend.vercel.app/appointment')

            return Appointments
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then( ({url}) => {
    console.log(`Server ready at ${url}`)
} )