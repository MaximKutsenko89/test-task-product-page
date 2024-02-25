export type LoginResponse = {
  access_token: string;
};

export type LoginParams = {
  email: string;
  password: string;
};
export type SuccessUerResponse = {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: null;
    created_at: string;
    updated_at: string;
  };
};
export type User = {
  isAuthorized: boolean;
  token: string;
  userName: string;
};
export type Product = {
  id: number;
  title: string;
  price: string;
  thumbnail: string;
};
export type Response = {
  current_page: number;
  data: Product[];
  total: number;
};
export type SearchParams = {
  page: number;
  token: string;
  from?: string;
  to?: string;
  price_from?: string;
  price_to?: string;
  title?: string;
};
