const Joi = require('joi');

const _id = Joi.string();
const name = Joi.string().min(4).max(80);
const lastName = Joi.string().min(4).max(80);
const phone = Joi.string().min(10).max(80);
const role = Joi.string().valid('user', 'admin');
const picture = Joi.string();
const address = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(4).max(80);
const createdAt = Joi.date();

const createUserSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    picture: picture,
    role: role,
    address: address.required(),
    email: email.required(),
    password: password.required(),
    createdAt: createdAt,
})

const updateUserSchema = Joi.object({
    _id: _id.required(),
    name: name,
    lastName: lastName,
    phone: phone,
    picture: picture,
    address: address,
    email: email,
    password: password,
})

module.exports = { createUserSchema, updateUserSchema };