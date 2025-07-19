import { Contact, ContactData } from '@/lib/entities/contact';
import { ContactRepository } from './contact-repository';

export class LocalStorageContactRepository implements ContactRepository {
  private readonly storageKey = 'phone_book_contacts';

  async getAll(): Promise<Contact[]> {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      
      const contactsData: ContactData[] = JSON.parse(data);
      return contactsData.map(data => new Contact({
        ...data,
        createdAt: new Date(data.createdAt || Date.now()),
        updatedAt: new Date(data.updatedAt || Date.now()),
      }));
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Contact | null> {
    const contacts = await this.getAll();
    return contacts.find(contact => contact.id === id) || null;
  }

  async save(contact: Contact): Promise<Contact> {
    const contacts = await this.getAll();
    const index = contacts.findIndex(c => c.id === contact.id);
    
    if (index >= 0) {
      contacts[index] = contact;
    } else {
      contacts.push(contact);
    }
    
    await this.saveAll(contacts);
    return contact;
  }

  async delete(id: string): Promise<void> {
    const contacts = await this.getAll();
    const filtered = contacts.filter(contact => contact.id !== id);
    await this.saveAll(filtered);
  }

  async findByPhone(phone: string): Promise<Contact | null> {
    const contacts = await this.getAll();
    const cleanPhone = phone.replace(/\D/g, '');
    return contacts.find(contact => 
      contact.phoneNumbers.some(p => p.replace(/\D/g, '') === cleanPhone)
    ) || null;
  }

  async findByEmail(email: string): Promise<Contact | null> {
    const contacts = await this.getAll();
    const lowerEmail = email.toLowerCase().trim();
    return contacts.find(contact => 
      contact.emails.some(e => e.toLowerCase() === lowerEmail)
    ) || null;
  }

  private async saveAll(contacts: Contact[]): Promise<void> {
    try {
      const data = contacts.map(contact => contact.toData());
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving contacts:', error);
      throw new Error('Failed to save contacts');
    }
  }
}