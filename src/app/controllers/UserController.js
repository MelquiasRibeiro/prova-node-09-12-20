import * as Yup from 'yup';
import User from '../models/User';
class UserController {
    async index(req, res) {
        const user = await User.findAll();
    
        return res.json({ user });
      }
    
      async show(req, res) {
        const user = await User.findByPk(req.params.id);
    
        return res.json({ user });
      }    
      async store(req, res) {
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          username: Yup.string().required(),
          email: Yup.string().email().required(),
          password: Yup.string().required().min(5),
        });
    
        if (!(await schema.isValid(req.body))) {
          return res.status(400).json({ erro: 'validation fails' });
        }
        const userNameIsInUse = await User.findOne({ where: { username: req.body.username } });
        if (userNameIsInUse) {
            return res.status(400).json({
              error: 'this user name is alredy in use',
            });
          }
        const userExist = await User.findOne({ where: { email: req.body.email } });
        if (userExist) {
          return res.status(400).json({
            error: 'this email is alredy registred in our database',
          });
        }
    
        const user = await User.create(req.body);
    
        return res.status(201).send(user);
      }

      async destroy(req, res) {
        await User.destroy({ where: { id: req.params.id } });
    
        return res.status(204).json({"status":"deleted"});
      }
         
}

export default new UserController();