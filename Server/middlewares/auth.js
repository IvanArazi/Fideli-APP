import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret_key = process.env.SECRET_KEY;

const validationToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).json({msg:'No se paso el jwt'})
    }

    const token = auth.split(' ')[1];

    jsonwebtoken.verify(token, secret_key, ( error, decoded ) => {
        if(error){
            return res.status(403).json({msg: 'Token Inválido'});
        }

        if (decoded.role !== 'user') {
            return res.status(403).json({ msg: 'No autorizado: solo usuarios' });
        }

        req.userId = decoded.id;
        next();
    })

}

export { validationToken }