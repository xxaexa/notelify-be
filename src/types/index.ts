// File: interfaces/UserPayload.ts
export interface UserDetail {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface UserPayload {
  token: string;
  user: UserDetail;
}
