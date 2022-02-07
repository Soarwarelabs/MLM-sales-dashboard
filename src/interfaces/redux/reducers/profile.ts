export interface ProfileState {
  name: string | null;
  email: string | null;
  uuid: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  role: {
    name: string;
    code: string;
    uuid: string;
  } | null;
  promo_code: string | null;
}
