export { isUserAdmin, isUserManager, getUserRoles } from 'entities/User/model/selectors/roleSelectors';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export type { UserSchema, User } from './model/types/user';
export { userReducer, userActions } from './model/slice/userSlice';
export { UserRole } from './model/consts/userConsts';
