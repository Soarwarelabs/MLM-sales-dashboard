export interface AccountantData {
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  cnic: string;
  promo_code: string;
  uuid: string;
  role: {
    name: string;
    code: string;
    uuid: string;
  } | null;
  city: {
    name: string;
    id: number;
  } | null;
  area: {
    name: string;
    uuid: string;
  }[];
}

export interface Area {
  name: string;
  uuid: string;
}

export interface AccountantFormData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  cnic: string;
  city: {
    name: string;
    id: number;
  } | null;
  area: string[];
}
