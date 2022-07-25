export interface StoredTask {
  _id: string;
  name: string;
  createdBy: string;
  accountable: string[];
  deliveryDate: Date;
  status: string;
}