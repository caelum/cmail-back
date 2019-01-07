import { validatorMiddleware } from '../infra/validator';
import { EmailsController } from "../controllers/EmailsController";
import { EmailsRepository } from "../repositories/EmailsRepository";
import { authSchema } from "../controllers/schemas/authSchema";

module.exports = (app) => {
    const emails = app.datasource.models.emails;
    const emailsRepository = new EmailsRepository(emails);
    const emailsController = new EmailsController(emailsRepository);

    app.post('/emails', 
            validatorMiddleware({
                headers: authSchema
            }),
            emailsController.sendEmail)


    app.get('/emails', 
            validatorMiddleware({
                headers: authSchema
            }),
            emailsController.listAllEmailsFromUser)


    app.delete('/emails/:id', 
            validatorMiddleware({
                headers: authSchema
            }),
            emailsController.removeEmail)

}