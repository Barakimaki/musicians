export interface Profile {
  id?: number;
  name?: string;
  familyName?: string;
  birthDate?: Date;
  avatarUrl?: string;
  user?: {
    username?: string;
    id?: number;
  };
}
