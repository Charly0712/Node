import express, {Request, Response} from 'express';

const  router = express.Router();

function getUserByEmail(req: Request, res: Response){
    const {email} = req.params;
    res.send(`User with email ${email}`)
}

router.get('/', getUserByEmail)
router.post('/me', getUserByEmail)

export default router;