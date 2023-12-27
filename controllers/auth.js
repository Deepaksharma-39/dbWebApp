import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';


// Register a new user
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      console.log(user);
      res.json({ message: 'Registration successful' });
    } catch (error) {
      next(error);
    }
  };
  
  // Login with an existing user
  export const login = async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }  

      console.log('Stored hashed password:', user.password)

      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch)
      if (!passwordMatch) {

        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
  
