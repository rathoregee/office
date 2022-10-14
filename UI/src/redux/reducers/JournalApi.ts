
import axios from 'axios';

 interface Account {
  id: string;
  name: string;
  parentId: string;
  typeId: string;
}

export interface AccountResult {
  companyId: string;
  accounts: Account[];
}

export async function getAccounts(): Promise<AccountResult> {  
  const url = 'http://localhost:5000/v1/accounts';  
  try {    
    const employeesResponse = await axios.get<AccountResult>(url);
    return  employeesResponse.data;
  } catch (err) {
    throw err;
  }
}