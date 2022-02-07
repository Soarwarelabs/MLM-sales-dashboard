export type PaymentStatus =
  | "pending"
  | "completed"
  | "partial"
  | "failed"
  | "refunded";

export type ShopStatus = "pending" | "created" | "active" | "refused";

export interface ShopData {
  address: string;
  created_at: Date;
  updated_at: Date;
  area: string | null;
  latitude: string;
  longitude: string;
  shop_image: string | null;
  email: string;
  name: string;
  phone: string;
  promo_code: string;
  shop_owner: {
    name: string;
    uuid: string;
  };
  plan: {
    amount: number;
    name: string;
    uuid: string;
  };
  uuid: string;
  payment_status: PaymentStatus;
  shop_status: ShopStatus;
  attachment: ArrayBuffer | string | null;
  payment_method: string | null;
}

export interface ShopUpdateData {
  name: string;
  address: string;
  phone: string;
  owner_name: string;
}

export interface TransactionData {
  uuid: string;
  shop_uuid: string;
  // attachment: ArrayBuffer | string | null,
  payment_status: string;
  attachment: any;
  reference_id: number;
  paid_amount: number;
  package: string;
  payment_method: string;
  pay_type: string;
  purpose: string;
  billing_date: Date;
  pay_date: Date;
}
