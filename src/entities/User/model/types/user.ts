import { UserRole } from '../consts/userConsts';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
