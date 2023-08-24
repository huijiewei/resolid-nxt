import type { SessionUser } from '~/foundation/session';
import type { UserSelect, UserSelectWithGroup } from './userSchema';

export const userIsAdmin = (user: UserSelect | UserSelectWithGroup | SessionUser | null) => {
  return user && user.userGroupId == 1;
};
