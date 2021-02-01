import express from 'express';
import cors from 'cors';
import Database from './config/Database';

//Init database
Database.getInstance().getConnection();

//Configure server
const app = express();
app.use(cors());
app.use(express.json());

//Routes
import Pets from './routes/Pets';
import Users from './routes/Users';
//

app.use('/api/v1/users', Users);
app.use('/api/v1/pets', Pets);

//Init server
const server = app.listen(6789, () => {
    console.log("Server running at port 6789");
});

process.on('unhandledRejection', (err: any, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})