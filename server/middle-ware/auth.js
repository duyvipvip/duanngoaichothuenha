var jwt = require('./../utils/jwt');
var authController = require('../controllers/auth.controller');

exports.auth = function () {
    return function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, function (err, decodedData) {
                if (err) {
                    res.status(401);
                    res.json({
                        message: 'Invalid Token'
                    });
                } else {
                    var email = decodedData.email;
                    authController.checkAuth({
                        email: decodedData.email
                    })
                        .then(function (user) {
                            req.user = user;
                            next();
                        })
                        .catch(function (err) {
                            res.status(401);
                            res.json({
                                message: 'Invalid Token, User not found'
                            });
                        });
                }
            })
        } else {
            res.status(401);
            res.json({
                message: "Not Authorized"
            });
        }
    }
}
