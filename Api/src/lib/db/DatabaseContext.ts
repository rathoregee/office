import { db } from './db';
import { Company, User } from './DataTypes';

export class DatabaseContext {
    public async GetComapnies(): Promise<Company | null> {
        return await db.oneOrNone<Company>('SELECT * from public.company');
    }
    public async GetUsers(companyId: string): Promise<User[] | null> {
        return await db.many<User>(
            'SELECT * from public.user where companyid = $1 ', [companyId]
        );
    }
    public async GetUsers2(): Promise<Company | null> {
        return await db.oneOrNone<Company>('SELECT * from public.user');
    }
}
