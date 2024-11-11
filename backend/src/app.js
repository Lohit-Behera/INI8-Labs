import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(express.static('public'));
app.use('/images', express.static('images'));

// routes import

//routes declaration

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});

export { app }