
import axios from 'axios';

export interface Account {
  id: string;
  name: string;
  parentId: string;
  typeId: string;
}

interface AccountResult {
  employees: Account[];
}

export async function getEmployees(): Promise<AccountResult> {
  const url = 'http://localhost:5000/v1/accounts';  
  try {
    const employeesResponse = await axios.get<{ data: AccountResult }>(url);
    return  employeesResponse.data.data;
  } catch (err) {
    throw err;
  }
}