export interface ContactData {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumbers: string[];
  emails: string[];
  address?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumbers?: string[];
  emails?: string[];
  address?: string;
  notes?: string;
}