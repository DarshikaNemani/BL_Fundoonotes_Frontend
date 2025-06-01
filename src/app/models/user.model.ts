export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional for response
  phoneNumber?: string;
  imageUrl?: string;
  role?: string;
  service?: string;
  createdDate?: string;
  modifiedDate?: string;
  addresses?: any[];
  realm?: string;
  username?: string;
  emailVerified?: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  service: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  service: string;
}
