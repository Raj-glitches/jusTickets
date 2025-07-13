import User from "../models/User.js";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "jusTickets" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-form-clerk'},
    {event: 'clerk/user.created'},
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url,} = event.data
        const userData = {
            _id: id,
            email: email_addresses?.[0]?.email_address || '',
            name: first_name + ' ' + last_name,
            image: image_url
        }
        try {
      await User.create(userData);
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
    }
)

// Inngest Function to delete user data to a database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-form-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event}) => {

        const {id} = event.data
        try {
      await User.findByIdAndDelete(id);
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
    }
)

// Inngest Function to save user data to a database
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-form-clerk'},
    {event: 'clerk/user.updated'},
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url,} = event.data
        const userData = {
            _id: id,
            email: email_addresses?.[0]?.email_address || '',
            name: first_name + ' ' + last_name,
            image: image_url
        }
        try {
      await User.findByIdAndUpdate(id, userData);
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
    }
)



// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];