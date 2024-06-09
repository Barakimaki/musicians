export interface Artist {
  id?: number;
  name?: string;
  description?: string;
  bandLink?: string;
  logoUrl?: string;
  user?: {
    id: number;
  };
}
