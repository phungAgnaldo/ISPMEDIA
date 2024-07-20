export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
  avatarUrl: string;
  description?: string;
}
