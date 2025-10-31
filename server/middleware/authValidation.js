import Joi from "joi"


export const signUpValidation = (req , res , next) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required(),
    }) 

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(404).json({ success : false , message : error.message});
    }
    next();
}

export const signInValidation = (req , res , next) => {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required(),
    }) 

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(404).json({ success : false , message : error.message});
    }
    next();
}