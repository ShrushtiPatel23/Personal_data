var db = require('../config/database');
const Auth = db.auth;

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const JWT_SECRET = "byeee";

module.exports = {

    createUser: async (req, res) => {

        try {
            // Check whether the user with this email exists already
            let admin = await Auth.findOne({ where: { email: req.body.email } });
            if (admin) {
                return res.status(500).json({
                    success: 0,
                    message: "Email already Exist"
                });
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            const secPass = await bcrypt.hash(req.body.password, salt)

            // Create a new admin
             admin = await Auth.create({
                email: req.body.email,
                password: secPass
            });

            // res.json(user)
            success = true;
            return res.status(200).json({
                success: 1,
                data: admin
            });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                success: 0,
                message: "Internal Server Error"
            });
        }

    },

    loginUser: async (req, res) => {
        
        const { email, password } = req.body;
        try {
            let admin = await Auth.findOne({ where: { email: email } });
            if (!admin) {
                return res.status(500).json({
                    success: 0,
                    message: "Please try to login with correct email"
                });
            }

            const passwordCompare = await bcrypt.compare(password, admin.password);
            if (!passwordCompare) {
                return res.status(500).json({
                    success: 0,
                    message: "Password Is Incorrect"
                });
            }

            const data = {
                admin: {
                    id: admin.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({
                success: 1,
                authtoken: token
            });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                success: 0,
                message: "Internal Server Error"
            });

        }
    },

    userData: async (req, res) => {
        const id = req.admin.id;
        console.log(req.admin.id);
        const admin = await Auth.findByPk(id);
        if (admin === null) {
            console.log('Not found!');
        } else {
            console.log(admin instanceof Auth); // true
            res.send(admin)
            // Its primary key is 123
        }


    }
}