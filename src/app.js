import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ 
        sucess: true,
        message: "Server is healthy"
    });
});

app.use("/api/users", userRoutes);

export default app;