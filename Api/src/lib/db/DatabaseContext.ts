import { db } from './db';
import { Company } from './DataTypes';

export class DatabaseContext {
    public async GetComapnies(): Promise<Company | null> {
        return await db.oneOrNone<Company>('SELECT * from public.company ');
    }
}