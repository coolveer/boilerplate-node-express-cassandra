import * as Joi from 'joi'
import * as express from 'express';

export const userValidation =(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const schema = Joi.object({
        name    : Joi.string().min(3).required(),
        password: Joi.string().min(8).required(),
        email   : Joi.string().email().required()
    });

    const {error,value} = schema.validate(req.body);
    if(error){
        return res.status(401).send("User validation failed");
    }
    next();
}