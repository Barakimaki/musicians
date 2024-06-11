export interface Market {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  photoUrl?: string;
  user?: {
    id: number;
  };
}
