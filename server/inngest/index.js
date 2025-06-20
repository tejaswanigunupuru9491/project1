import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });
console.log("SIGNING KEY from env:", process.env.INNGEST_SIGNING_KEY);



// inngest function to save user data to a database
const syncUserCreation=inngest.createFunction(
    {id:'sync-user-from-clerk'},
    {event:'clerk/User.created'},
    async ({ event })=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name + ' '+last_name,
            image:image_url
        }
        await  User.create(userData)
    }
)

// inngest function to delete user database
const syncUserDeletion=inngest.createFunction(
    {id:'delete-user-from-clerk'},
    {event:'clerk/User.deleted'},
    async ({ event })=>{
        const{id}=event.data
        await User.findByIdAndDelete(id)
       
        }
)

//inngest function to update user data in dtabase
const syncUserUpdation=inngest.createFunction(
    {id:'update-user-from-clerk'},
    {event:'clerk/User.updated'},
    async ({ event })=>{
        const{id,first_name,last_name,email_addresses,image_url}=event.data 
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name + ' '+last_name,
            image:image_url
        }
        await User.findByIdAndUpdate(id,userData)
        }
)

export const functions = [syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];
