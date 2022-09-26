import { db } from './db';
import { Company, User, Role } from './DataTypes';

export class DatabaseContext {
    public async GetComapnies(): Promise<Company | null> {
        return await db.oneOrNone<Company>('SELECT * from public.company');
    }
    public async GetUsers(companyId: string): Promise<User[] | null> {
        return await db.many<User>(
            'SELECT * from public.user where companyid = $1 ',
            [companyId]
        );
    }
    public async GetRoles(companyId: string): Promise<Role[] | null> {
        return await db.many<Role>(
            'SELECT * from public.role where companyid = $1 ',
            [companyId]
        );
    }
    public async GetBanks(companyId: string): Promise<Role[] | null> {
        return await db.many<Role>(
            'SELECT * from public.bank where companyid = $1 ',
            [companyId]
        );
    }
}
