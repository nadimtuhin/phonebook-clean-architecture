import { Contact } from '@/lib/entities/contact';

export class SearchContactsUseCase {
  execute(contacts: Contact[], searchTerm: string): Contact[] {
    if (!searchTerm.trim()) {
      return contacts;
    }

    const term = searchTerm.toLowerCase().trim();
    
    return contacts.filter(contact => {
      return (
        contact.firstName.toLowerCase().includes(term) ||
        contact.lastName.toLowerCase().includes(term) ||
        contact.fullName.toLowerCase().includes(term) ||
        contact.phoneNumbers.some(phone => phone.includes(term)) ||
        contact.emails.some(email => email.toLowerCase().includes(term)) ||
        (contact.address && contact.address.toLowerCase().includes(term)) ||
        (contact.notes && contact.notes.toLowerCase().includes(term))
      );
    });
  }
}