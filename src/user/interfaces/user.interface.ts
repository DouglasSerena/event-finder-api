export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  providerId?: string;
  provider: 'google' | 'facebook';
}
