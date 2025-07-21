import app from "./app";
import env from "./config/validateEnv";

const port = env.PORT;

app.listen(port, () => {
    console.log("Server running on port:", port);
})