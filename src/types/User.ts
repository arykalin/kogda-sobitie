enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

type User = {
  email?: string;
  name?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  active?: boolean;
  role?: Role;
  authCode?: string;
 }

export default User
