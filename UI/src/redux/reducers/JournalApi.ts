
import axios from 'axios';

export interface Account {
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
  var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
  };
  const url = 'http://localhost:5000/v1/accounts';  
  try {    
    const employeesResponse = await axios.get<{ data: AccountResult }>(url, config);
    debugger
    return  employeesResponse.data.data;
  } catch (err) {
    throw err;
  }
}