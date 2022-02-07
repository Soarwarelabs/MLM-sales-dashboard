export interface ComplaintData {
  order: {
    order_key: string | null;
  };
  user: {
    name: string;
    number: string;
  };
  shop: {
    name: string | null;
    number: string | null;
  };
  created_at: Date;
  uuid: string;
  subject: string;
  ticket_key: number;
  ticket_status: string;
  ticket_id: any;
}
