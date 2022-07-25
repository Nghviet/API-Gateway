const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
var privateKey = fs.readFileSync('jwt.key');
console.log(privateKey)

var publicKey = fs.readFileSync('jwt.pem');
console.log(privateKey)

var decryptStringWithRsaPrivateKey = function(toDecrypt) {
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports = {
	name:'jwt_verify',
	policy: (actionParams) => {
		return (req,res,next) => {
			const jwtToken = (req.headers.authorization || '').split(' ')[1] || '';
			jwt.verify(jwtToken, publicKey, { algorithm: ['RS256']}, (err,decoded) => {
				if(err) {
					console.log(err)
					res.sendStatus(401)
					return
				}
				console.log(decoded)
				req.headers.user_id = decryptStringWithRsaPrivateKey(decoded.user_id)
				req.headers.home_id = decryptStringWithRsaPrivateKey(decoded.home_id)
				next()
				return
			})
		}
	},
	schema: {
		"$id": "jwt_verify",
		type: 'object',
	    properties: {	        
	    }
	}
}
