import jwt from 'jsonwebtoken';

function authenticate(req,res,next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message:'Not Authorizated'});
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Token is not correct!' });
    }
}

export {authenticate};