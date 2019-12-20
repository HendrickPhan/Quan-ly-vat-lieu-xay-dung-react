export  const ADMIN = 0;
export const MANAGER = 1;
export const ASSISTANT = 2;
export const AGENCY_MANAGER = 3;
export const BUSINESS_STAFF = 4;
export const WAREHOUSE_STAFF = 5;

export function getUserRole(){
    let userRole = 0;

    if(JSON.parse(localStorage.getItem('user_info'))) {
        userRole =  JSON.parse(localStorage.getItem('user_info')).user.role;
    }

    return userRole;
}