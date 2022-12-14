export interface Company {
    id: string;
    name: string;
    address: string;
    landline: string;
    mobile: string;
    email: string;
}

export interface User {
    id: string;
    name: string;
    roleid: string;
    companyid: string;
    type: string;
}

export interface Role {
    id: string;
    name: string;
    companyid: string;
}

export interface Bank {
    active: string;
    name: string;
    companyid: string;
}

export interface Apartment {
    active: string;
    name: string;
    companyid: string;
}

