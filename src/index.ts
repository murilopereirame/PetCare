import express from 'express';
import cors from 'cors';
import Database from './config/Database';
import routes from './routes';

//Init database
Database.getInstance().getConnection();

//Configure server
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

//Init server
const server = app.listen(6789, () => {
    console.log("Server running at port 6789");
});

process.on('unhandledRejection', (err: any, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})