import React from 'react';
import { Contact } from '@/lib/entities/contact';
import { ContactCard } from '@/components/ContactCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Users } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  isLoading: boolean;
  onEditContact: (contact: Contact) => void;
  onDeleteContact: (contact: Contact) => void;
}

export function ContactList({ 
  contacts, 
  isLoading, 
  onEditContact, 
  onDeleteContact 
}: ContactListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
        <p className="text-gray-500">
          Start building your phone book by adding your first contact.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={() => onEditContact(contact)}
          onDelete={() => onDeleteContact(contact)}
        />
      ))}
    </div>
  );
}