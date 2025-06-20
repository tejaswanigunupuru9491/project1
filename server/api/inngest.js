// api/inngest.js

import { serve } from "inngest/vercel"; // For Vercel deployment
import { inngest, functions } from "../inngest/index.js"; // Adjust path if needed

export default serve(inngest, functions);
