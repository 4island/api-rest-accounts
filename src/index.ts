import app from "./app";
import { connection } from './database/database';

const main = async () => {
    await connection();
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();