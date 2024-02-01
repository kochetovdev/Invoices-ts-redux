export interface Invoice {
  id: string;
  number: number;
  date_created?: string;
  date_supplied?: string;
  comment: string;
}

export interface Date_Created {
  nanoseconds: number;
  seconds: number;
}
