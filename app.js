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
        petById(id: String!): Pet
    }

    type Mutation{
        registPet(
            name: String!
            image: String
            race: String!
            age: String!
            size: String!
        ): Pet
        createAppointment(
            date: String!
            hour: String!
            type: String!
            pet: String!
        ): Appointment
        editPet(
            name: String!
            image: String
            race: String!
            age: String!
            size: String!
        ): Pet
        deletePet(_id: String!): String
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
        },
        petById: async (parent,args) => {
            const {data: Pet} = await axios.get(`https://petbackend.vercel.app/pet/${args.id}`)

            return Pet
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
                if(!pet.data) return null
                
                const p = {...args}
                return p
            } catch (error) {
                throw new Error("No se pudo agregar")
            }
        },
        createAppointment: async (parent,args) => {
            try{
                const appointment = await axios.post(`https://petbackend.vercel.app/appointment/${args.pet}`, {
                    date: args.date,
                    hour: args.hour,
                    type: args.type,
                    pet: args.pet
                })
                if(!appointment.data) return null

                const a = {...args}
                return a
            } catch (error){
                throw new Error("No se pudo agregar")
            }
        },
        editPet: async (parent,args) => {
            try {
                const {data: Pets} = await axios.get('https://petbackend.vercel.app/pet')
                const pet = Pets.find(p => p.name === args.name)

                const {data: petUpdated} = await axios.put(`https://petbackend.vercel.app/pet/${pet._id}`, {
                name: args.name,
                image: args.image,
                race: args.race,
                age: args.age,
                size: args.size
                })
                if(!petUpdated) return null

                const pU = {...args}
                return pU
            } catch (error) {
                throw new Error("No se pudo actualizar")
            }
        },
        deletePet: async (parent,args) => {
            try {
                const pet = await axios.delete(`https://petbackend.vercel.app/pet/${args._id}`)
                if(!pet.data) return null

                return "Deleted correctly"
            } catch (error) {
                throw new Error("No se pudo eliminar")
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