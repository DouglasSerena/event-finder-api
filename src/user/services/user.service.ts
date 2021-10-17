/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleTry } from 'src/utils/handle-try';
import { IUser } from '../interfaces/user.interface';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async getByIdOrProviderId(idOrProviderId: string): Promise<IUser> {
    const [data, error] = await handleTry(
      this.userModel
        .findOne({
          $or: [
            { id: `${idOrProviderId}` },
            { providerId: `${idOrProviderId}` },
          ],
        })
        .exec(),
    );

    if (error || !data) {
      throw new Error('User not found');
    }

    return data;
  }

  public async create(user: Omit<IUser, 'id'>) {
    const [data] = await handleTry(this.getByIdOrProviderId(user.providerId));

    if (data) {
      throw new Error('Already registered user');
    } else {
      return await this.userModel.create(user);
    }
  }

  public async update(user: Partial<IUser> & { _id: string }) {
    await this.getByIdOrProviderId(user.providerId);
    return await this.userModel.updateOne({ _id: user._id }, user);
  }
}
