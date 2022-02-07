// export type PaymentStatus =
//   | "pending"
//   | "completed"
//   | "partial"
//   | "failed"
//   | "refunded";

//export type ShopStatus = "pending" | "created" | "active" | "refused";

export interface InquiryType {
  code: string;
  name: string;
}

export interface Assigning {
  name: string;
  uuid: string;
}

export interface InquiryData {
  created_at: string;
  uuid: string;
  name: string;
  number: string;
  email: string;
  message: string;
  type: string;
  status: string;
  shop: {name:string, number:string};
  assigned_to: Assigning | null;
  assigned_by: Assigning | null;
}
