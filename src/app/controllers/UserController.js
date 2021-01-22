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
      async update(req, res) {
        const schema = Yup.object().shape({
          name: Yup.string(),
          username: Yup.string(),
          oldPassword: Yup.string().min(5),
          password: Yup.string()
            .min(6)
            .when('oldPassword', (oldPassword, field) =>
              oldPassword ? field.required() : field
            ),
          passwordConfirmation: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
          ),
        });
    
        if (!(await schema.isValid(req.body))) {
          return res.status(400).json({ erro: 'validation fails' });
        }
    
        const { email, oldPassword } = req.body;
    
        const user = await User.findByPk(req.userId);
    
        if (email !== user.email) {
          const userExist = await User.findOne({ where: { email } });
    
          if (userExist) {
            return res
              .status(400)
              .json({ error: 'this email is alredy registred in our database' });
          }
        }

        const userNameIsInUse = await User.findOne({ where: { username: req.body.username } });
        if (userNameIsInUse) {
            return res.status(400).json({
              error: 'this user name is alredy in use',
            });
          }
    
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
          return res.status(401).json({ error: 'password is wrong' });
        }
    
        const { id, name, provider } = await user.update(req.body);
    
        return res.json({ id, name, provider });
      }
    

      async destroy(req, res) {
        await User.destroy({ where: { id: req.params.id } });
    
        return res.status(204).json({"status":"deleted"});
      }
         
}

export default new UserController();