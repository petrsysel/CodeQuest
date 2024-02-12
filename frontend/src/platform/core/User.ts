export class User{
    username: string
    fullname: string
    email: string

    constructor(username: string, fullname: string, email: string){
        this.username = username
        this.fullname = fullname
        this.email = email
    }
}