export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  providerId?: string;
  provider: 'google' | 'facebook';
}
