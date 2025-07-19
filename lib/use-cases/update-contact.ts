import { Contact, ContactData } from '@/lib/entities/contact';
import { ContactRepository } from '@/lib/adapters/repositories/contact-repository';

export class UpdateContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string, updates: Partial<ContactData>): Promise<Contact> {
    const existingContact = await this.contactRepository.getById(id);
    if (!existingContact) {
      throw new Error('Contact not found');
    }

    // Check for duplicate phone numbers (excluding current contact)
    if (updates.phoneNumbers) {
      for (const phone of updates.phoneNumbers) {
        const duplicate = await this.contactRepository.findByPhone(phone);
        if (duplicate && duplicate.id !== id) {
          throw new Error(`Phone number ${phone} already exists for ${duplicate.fullName}`);
        }
      }
    }

    // Check for duplicate emails (excluding current contact)
    if (updates.emails) {
      for (const email of updates.emails) {
        const duplicate = await this.contactRepository.findByEmail(email);
        if (duplicate && duplicate.id !== id) {
          throw new Error(`Email ${email} already exists for ${duplicate.fullName}`);
        }
      }
    }

    const updatedContact = existingContact.update(updates);
    return await this.contactRepository.save(updatedContact);
  }
}