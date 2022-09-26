import pgPromise from 'pg-promise';
import { LoggerConfiguration, ConsoleSink } from 'serilogger';
const logger = new LoggerConfiguration().writeTo(new ConsoleSink()).create();
import { Company } from './DataTypes';

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
    /*eslint-disable */
    host: process.env.PGHOST,
    /*eslint-disable */
    port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
    /*eslint-disable */
    database: process.env.DATABASE,
    /*eslint-disable */
    user: process.env.PGUSER,
    /*eslint-disable */
    password: process.env.PGPASSWORD,
});

export class DatabaseContext {
    public async GetComapnies(): Promise<Company | null> {
        return await db.oneOrNone<Company>('SELECT * from public.company ');
    }
}