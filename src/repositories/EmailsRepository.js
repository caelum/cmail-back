export class EmailsRepository {
    
    constructor(emails){
        this.emails = emails;
    }

    create = (email) => {
        return this.emails.create(email)
    }
}