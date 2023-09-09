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
        appointmentById(id: String!): Appointment
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
            id: String!
            name: String!
            image: String
            race: String!
            age: String!
            size: String!
        ): Pet
        deletePet(id: String!): String
        editAppointment(
            id: String!
            date: String!
            hour: String!
            type: String!
        ): Appointment
        deleteAppointment(id: String!): String
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
        },
        appointmentById: async (parent,args) => {
            const {data: Appointment} = await axios.get(`https://petbackend.vercel.app/appointment/${args.id}`)

            return Appointment
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
                /*const {data: Pets} = await axios.get('https://petbackend.vercel.app/pet')
                const pet = Pets.find(p => p.name === args.name)*/

                const {data: petUpdated} = await axios.put(`https://petbackend.vercel.app/pet/${args.id}`, {
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
                const pet = await axios.delete(`https://petbackend.vercel.app/pet/${args.id}`)
                if(!pet.data) return null

                return "Pet deleted correctly"
            } catch (error) {
                throw new Error("No se pudo eliminar")
            }
        },
        editAppointment: async (parent,args) => {
            try {
                /*const {data: Appointments} = await axios.get('https://petbackend.vercel.app/appointment')
                const appointment = Appointments.find(p => p.date === args.date && p.hour === args.hour)*/

                const {data: appointmentUpdate} = await axios.put(`https://petbackend.vercel.app/appointment/${args.id}`, {
                    date: args.date,
                    hour: args.hour,
                    type: args.type
                })
                if(!appointmentUpdate) return null

                const aU = {...args}
                return aU
            } catch (error) {
                throw new Error("No se pudo actualizar")
            }
        },
        deleteAppointment: async (parent,args) => {
            try {
                const appointment = await axios.delete(`https://petbackend.vercel.app/appointment/${args.id}`)
                if(!appointment.data) return null

                return "Appointment deleted correctly"
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