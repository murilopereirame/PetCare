import express from 'express';
import cors from 'cors';
import Database from './config/Database';
import routes from './routes';

//Init database
Database.getInstance().getConnection();

//Configure server
const app = express();
app.use(cors());
app.use(express.json({limit: '50MB'}));
app.use('/api/v1', routes);
app.use(express.static('images'));
//Init server
const server = app.listen(80, () => {
    console.log("Server running at port 80");
});

process.on('unhandledRejection', (err: any, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})
