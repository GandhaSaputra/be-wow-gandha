const { users } = require('../../models');

const Joi = require('joi');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if(error){
        return res.status(400).send({
            status: 'error',
            message: error.details[0].message,
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });

        const dataToken = {
            id: newUser.id
        }

        const token = jwt.sign(dataToken, process.env.SECRET_KEY)

        res.send({
            status: 'success',
            data: {
                user: {
                    email: newUser.email,
                    token
                }
            }
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    }
}

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.send({
            stasus: 'error',
            message: error.details[0].message,
        });
    }
    
    try {
        const userExist = await users.findOne({
            where: {
                email: req.body.email,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isValid) {
            return res.send({
                stasus: 'failed',
                message: 'Email and Password not match',
            });
        }

        const dataToken = {
            id: userExist.id
        }

        const token = jwt.sign(dataToken, process.env.SECRET_KEY)

        const userEmail = userExist.email;
        const userName = userExist.name;

        res.send({
            status: 'success',
            message: `Welcome to WOW ${userExist.name}`,
            data: {
                users: {
                    name: userName,
                    email: userEmail,
                    token
                }
            }
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    }
}