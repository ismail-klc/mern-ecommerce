const User = require('../../models/user')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')


// signup controller
exports.signup = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    // if there is user with this email, return message this email is already registered
    if (user) {
        return res.status(400).json({ message: 'Email already registered' })
    }

    // if there is no user, first admin registration role happens super-admin
    const userCount = await User.estimatedDocumentCount()
    let role = "admin"
    if (userCount === 0) {
        role = "super-admin"
    }

    const { firstName, lastName, email, password } = await req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role,
    });

    _user.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: "Something went wrong",
            });
        }

        if (data) {
            return res.status(201).json({
                message: "Admin created Successfully..!",
            })
        }
    })
}

exports.signin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    // if user null, email is not registered
    if (user === null) {
        return res.status(400).json({ message: 'Email not registered' })
    }
    const isPasswordMatch = await user.authenticate(req.body.password)

    // password is correct then we sign jwt token
    if (isPasswordMatch && (user.role === "admin" || user.role === "super-admin")) {
        const token = jwt.sign({
            _id: user._id, role: user.role, email: user.email
        }, process.env.JWT, { expiresIn: process.env.JWT_EXPIRES })

        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: process.env.JWT_EXPIRES })
        res.status(200).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName },
        });
    }
    else {
        return res.status(400).json({
            message: "Invalid Password",
        });
    }
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...!",
    });
};