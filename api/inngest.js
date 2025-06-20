// api/inngest.js

import { serve } from "inngest/vercel"; // For Vercel deployment
import { inngest, functions } from "../server/inngest/index.js";


export default serve(inngest, functions);
