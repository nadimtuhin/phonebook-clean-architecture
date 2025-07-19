import { Contact, ContactData } from '@/lib/entities/contact';
import { ContactRepository } from '@/lib/adapters/repositories/contact-repository';

export class AddContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute(contactData: Omit<ContactData, 'id'>): Promise<Contact> {
    // Check for duplicate phone numbers
    for (const phone of contactData.phoneNumbers) {
      const existingContact = await this.contactRepository.findByPhone(phone);
      if (existingContact) {
        throw new Error(`Phone number ${phone} already exists for ${existingContact.fullName}`);
      }
    }

    // Check for duplicate emails
    for (const email of contactData.emails) {
      const existingContact = await this.contactRepository.findByEmail(email);
      if (existingContact) {
        throw new Error(`Email ${email} already exists for ${existingContact.fullName}`);
      }
    }

    // Create and save the contact
    const contact = new Contact(contactData);
    return await this.contactRepository.save(contact);
  }
}