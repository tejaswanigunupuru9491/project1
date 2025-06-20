// api/inngest.js
import { serve } from "inngest/vercel";
import { inngest, functions } from "../inngest/index.js";

export default serve(inngest, functions);
