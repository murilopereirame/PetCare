import { createConnection, Connection } from "typeorm";
export default class Database {
    
    private static instance: Database;
    private static connection: Connection;

    public static getInstance() {
        if(!Database.instance) 
            Database.instance = new Database();        
    
        return Database.instance;
    }

    async getConnection() {
        if(!Database.connection)
            Database.connection = await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "36562749",
                database: "petcare",
                synchronize: true,
                logging: false,
                entities: [
                   "src/entity/**/*.ts"
                ],
                migrations: [
                   "src/migration/**/*.ts"
                ],
                subscribers: [
                   "src/subscriber/**/*.ts"
                ],
                cli: {
                   "entitiesDir": "src/entity",
                   "migrationsDir": "src/migration",
                   "subscribersDir": "src/subscriber"
                }
            });
        
        return Database.connection;
    }
}