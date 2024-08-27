import bcrypt from 'bcrypt';
import { getUserDB,createUSerDB,findUser } from '../models/users.models.js';
import { v4 as uuidv4 } from 'uuid';
import { createSession } from '../models/session.models.js';

export const register = async (req, res) => {

    const { username, email, password } = req.body;
    try {
        const existingUserByEmail = await getUserDB({ email });
        if (existingUserByEmail.length > 0) {
            return res.status(400).send({ message: 'Email đã tồn tại' });
        }

        const saltRounds = 10; 
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = {
            username, 
            email, 
            password: hashedPassword
        };

        console.log(newUser);
        
        const createdUser = await createUSerDB(newUser);
        console.log(createdUser);
        

        res.status(201).send({ 
            message: 'Đăng ký thành công', 
            user: createdUser
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const checkEmail = await findUser({ email });
      if (!checkEmail) throw new Error("Email không tồn tại");
  
      const checkPassword = await bcrypt.compare(password, checkEmail.password);
      if (!checkPassword) throw new Error("Email hoặc mật khẩu không đúng");
  
      const randomString = uuidv4(); 
      const key = randomString;
  
      const apikey = `mern-${checkEmail._id.toString()}-${email}-${key}`;
      console.log(apikey);
  
      const newSession = {
        userID: checkEmail._id.toString(),
        email,
        key: key
      };
  
      await createSession(newSession);  
  
      res.status(200).send({
        message: "Đăng nhập thành công",
        token: key 
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };