import cors from "cors";

const corsClienty: cors.CorsOptions = {
    origin: "https://week-17-jokosetiawanfe.web.app/",
    methods: ["GET,POST,PUT,DELETE"],
    allowedHeaders: "Content-Type"
}

export default corsClienty