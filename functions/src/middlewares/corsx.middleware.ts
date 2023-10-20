import { Express } from "express";
import cors from "cors";

const corsClientx: cors.CorsOptions = {
    origin: "https://clinetx-week15.netlify.app/",
    methods: ["GET,POST"],
    allowedHeaders: "Content-Type"
}

export default corsClientx