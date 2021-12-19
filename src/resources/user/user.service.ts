import UserModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';
import token from '@/utils/token';
import { userInfo } from 'os';

class UserService {
  private user = UserModel;

  /**
   * Register a new user
   */
  public async register(
    email: string, 
    name: string, 
    password: string, 
    role: string
  ): Promise<string> {
    try {
      const user = await this.user.create({ email, name, password, role });
      const accessToken = token.createToken(user);

      return accessToken;
    } catch (error) {
      throw new Error('Unable to register user');
    }
  }

  /**
   * Attempt to login a new user
   */
  public async login(
    email: string, 
    password: string
  ): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });

      if (!user) {
        throw new Error(`Unable to find user with email ${email}`);
      }
      
      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      } else {
        throw new Error(`Wrong credentials given`);
      }
    } catch (err) {
      throw new Error(`Unable to login user`);
    }
  }
}

export default UserService;
