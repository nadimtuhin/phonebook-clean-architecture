import { Contact, ContactData } from '@/lib/entities/contact';

export interface ContactRepository {
  getAll(): Promise<Contact[]>;
  getById(id: string): Promise<Contact | null>;
  save(contact: Contact): Promise<Contact>;
  delete(id: string): Promise<void>;
  findByPhone(phone: string): Promise<Contact | null>;
  findByEmail(email: string): Promise<Contact | null>;
}