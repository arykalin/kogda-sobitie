enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

interface User {
  email?: string;
  fisrtName?: string;
  lastName?: string;
  image?: string;
  googleId?: string;
  active?: boolean;
  role?: Role;
}

export default User
