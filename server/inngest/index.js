import User from "../models/User.js";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "jusTickets" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-form-clerk'},
    {event: 'clerk/user.created'},
    async ({event}) => {
        const {id, first_name, last_name, email_address, image_url,} = event
        const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.create(userData)
    }
)

// Inngest Function to delete user data to a database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-form-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event}) => {

        const {id} = event.data
        await User.findByIdAndDelete(id)
    }
)

// Inngest Function to save user data to a database
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-form-clerk'},
    {event: 'clerk/user.updated'},
    async ({event}) => {
        const {id, first_name, last_name, email_address, image_url,} = event
        const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.findByIdAndUpdate(id, userData )
    }
)



// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];