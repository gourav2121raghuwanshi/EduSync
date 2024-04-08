const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(404).json("Unauthorized: Token is empty or incorrect");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(404).json("Forbidden" + err.message);

        req.user = user;
        next();
    });
};


