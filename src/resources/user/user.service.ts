import UserModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';

class UserService {
  private user = UserModel;

  /**
   * Create a new user
   */
  public async create(email: string, password: string): Promise<User> {
    try {
      const user = await this.user.create({ email, password });

      return user;
    } catch (error) {
      throw new Error('Unable to create user');
    }
  }
}

export default UserService;