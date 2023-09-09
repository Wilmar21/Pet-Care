import { ApolloServer,gql } from "apollo-server"
import axios from "axios"

const typeDefs = gql`
    type Pet{
        _id: String!
        name: String!
        image: String
        race: String!
        age: String!
        size: String!
        appointments: [String!]
        createdAt: String!
        updatedAt: String!
    }

    type Appointment{
        _id: String!
        date: String!
        hour: String!
        type: String!
        pet: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query{
        allPets: [Pet]
        allAppointments: [Appointment]
        petByName(name: String!): Pet
    }

    type Mutation{
        registPet(
            name: String!
            image: String
            race: String!
            age: String!
            size: String!
        ): Pet
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
        },
        petByName: async (parent,args) => {
            const {data: Pets} = await axios.get('https://petbackend.vercel.app/pet')
            const pet = Pets.find(p => p.name === args.name)

            return pet
        }
    },
    Mutation: {
        registPet: async (parent, args) => {
            try{
                const pet = await axios.post('https://petbackend.vercel.app/pet', {
                    name: args.name,
                    image: args.image,
                    race: args.race,
                    age: args.age,
                    size: args.size
                })
                const p = {...args}
                return p
            } catch (error) {
                throw new Error("No se pudo agregar")
            }
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