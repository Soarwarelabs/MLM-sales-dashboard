interface Role {
  name: string;
  code: string;
  uuid: string;
}

interface Area {
  name: string;
  uuid: string;
}

interface City {
  id: number;
  name: string;
}

export interface InquiryType {
  code: string;
  name: string;
}

export interface PaymentMethod {
  code: string;
  name: string;
}

export interface PaymentType {
  code: string;
  name: string;
}

export interface DropdownState {
  roles: Role[];
  area: Area[];
  cities: City[];
  payment_permissions: string[];
  inquiry_types: InquiryType[];
  payment_method: PaymentMethod[];
  payment_types: PaymentType[];
}
