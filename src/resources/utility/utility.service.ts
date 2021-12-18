import UtilityModel from '@/resources/utility/utility.model';
import Utility from '@/resources/utility/utility.interface';
import { Schema } from 'mongoose';

class UtilityService {
  private utility = UtilityModel;

  /**
   * Get a utility
   */
  public async get(_id: Schema.Types.ObjectId): Promise<Utility | null> {
    try {
      const utility = await this.utility.findById(_id);

      return utility;
    } catch (error) {
      throw new Error(`Unable to find utility with id ${_id}`);
    }
  }
}

export default UtilityService;