import express from "express";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

const origins = [
    CLIENT_URL
]

app.use(cors(
    {
        origin: origins,
        credentials: true,
        methods: ["*"],
        allowedHeaders:["*"]
    }
))
app.use(express.json());
app.use("/api/mail", mailRoutes);

app.get("/", (_, res) => {
  res.sendStatus(200).json("Server Live!");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});