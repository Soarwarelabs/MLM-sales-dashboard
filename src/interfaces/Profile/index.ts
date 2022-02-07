export interface ProfileUpdateData {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string
}

export interface ProfileFormUpdateData {
    uuid: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string
}

export interface PasswordData{
    
    old_password: string,
    new_password: string,
    confirm_password: string

}