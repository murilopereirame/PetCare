import express from 'express';
import cors from 'cors';
import routes from './routes';
import Database from './utils/Database';

//Init database
Database.getInstance().getConnection();

//Configure server
const app = express();
app.use(cors());
app.use(routes);

//Init server
app.listen(6789, () => {
    console.log("Server running at port 6789");
});