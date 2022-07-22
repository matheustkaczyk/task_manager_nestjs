export interface StoredTask {
  _id: string;
  name: string;
  accountable: string[];
  deliveryDate: Date;
  status: string;
}