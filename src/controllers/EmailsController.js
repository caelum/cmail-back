import HttpStatus from 'http-status'

export class EmailsController {
    
    constructor(emailRepository){
        this.emailRepository = emailRepository
    }

    sendEmail = (req,res) => {

        console.log(`ola`);
        

        this.emailRepository
            .create(req.body)
            .then(
                (res) => {
                    res.json(HttpStatus.OK)
                }
            )
            .catch(
                () => {
                    res.json(HttpStatus.INTERNAL_SERVER_ERROR)
                }
            )
    }
}