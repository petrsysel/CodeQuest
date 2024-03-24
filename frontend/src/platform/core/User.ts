export class User{
    username: string
    fullname: string
    email: string
    id: string

    constructor(username: string, fullname: string, email: string, id: string){
        this.username = username
        this.fullname = fullname
        this.email = email
        this.id = id
    }
}