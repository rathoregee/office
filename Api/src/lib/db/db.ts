import pgPromise from 'pg-promise';
import { LoggerConfiguration, ConsoleSink } from 'serilogger';
const logger = new LoggerConfiguration().writeTo(new ConsoleSink()).create();

const pgp = pgPromise({
    noLocking: true,
    connect: (client, dc, useCount) => {
        logger?.debug(
            'Connected to database {a}{b}',
            client.connectionParameters,
            useCount
        );
    },
    query: (eventContext) => {
        logger?.debug(
            'Query starting {a}{b}',
            eventContext.query,
            eventContext.params
        );
    },
    receive: (data, result, eventContext) => {
        logger?.debug(
            'Query starting {a}{b}{c}{d}',
            eventContext.query,
            eventContext.params,
            result?.rowCount,
            result?.duration
        );
    },
    error: (error, eventContext) => {
        logger?.debug(
            'Database error occurred {a}{b}{c}{d}',
            {
                ...error,
                name: error.name,
                message: error.message,
            },
            eventContext.cn,
            eventContext.query,
            eventContext.params
        );
    },
});

export const db = pgp({
    //host: process.env.PGHOST,
    host: 'localhost',
    //port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
    port: Number(5432),
    //database: process.env.DATABASE,
    database: 'postgres',
    //user: process.env.PGUSER,
    user: 'postgres',
    //password: process.env.PGPASSWORD,
    password: 'postgres',
});
