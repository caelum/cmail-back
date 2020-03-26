import Joi from "@hapi/joi";

export const authSchema = Joi.object({
    authorization: Joi.string().required()
});