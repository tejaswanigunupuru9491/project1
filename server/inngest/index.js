import { Inngest } from "inngest";
import User from "../models/User.js";

// ✅ Create an Inngest client with the signing key from your environment variables
export const inngest = new Inngest({
  id: "movie-ticket-booking",
  signingKey: process.env.INNGEST_SIGNING_KEY, // 🔑 This line is critical!
});

// ✅ Function: User Creation
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/User.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.create(userData);
  }
);

// ✅ Function: User Deletion
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/User.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// ✅ Function: User Update
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/User.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData);
  }
);

// ✅ Export all functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation
];
