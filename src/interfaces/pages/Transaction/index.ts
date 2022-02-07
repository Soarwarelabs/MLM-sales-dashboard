export interface TransactionData {
  uuid: string;
  shop: {
    uuid: string;
    name: string;
  };
  // attachment: ArrayBuffer | string | null,
  attachment: any;
  reference_id: number;
  paid_amount: number;
  package: {
    uuid: string;
    name: string;
    amount: number;
  };
  payment_method: {
    code: string;
    name: string;
  };
  pay_type: {
    code: string;
    name: string;
  };
  purpose: string;
  billing_date: Date;
  pay_date: Date;
  payment_status: string | undefined;
}
export interface FilteredTransactions {
  shop_status: string;
  packages: string;
  paymentstatus: string;
  start_date: any;
  end_date: any;
  search_filter: string | "";
}
export interface TransactionFormData {
  // attachment: ArrayBuffer | string | null,
  // shop_uuid: string,
  attachment: any | undefined;
  reference_id: number | undefined;
  paid_amount: number | undefined;
  package: string | undefined;
  payment_method: string | undefined;
  pay_type: string | undefined;
  purpose: string | undefined;
  billing_date: Date | undefined;
  pay_date: Date | undefined;
  payment_status: string | undefined;
}
