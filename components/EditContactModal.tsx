import React, { useState } from 'react';
import { Contact, ContactData } from '@/lib/entities/contact';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from '@/components/ContactForm';

interface EditContactModalProps {
  isOpen: boolean;
  contact: Contact | null;
  onClose: () => void;
  onUpdateContact: (id: string, data: Partial<ContactData>) => Promise<any>;
}

export function EditContactModal({ 
  isOpen, 
  contact, 
  onClose, 
  onUpdateContact 
}: EditContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<ContactData, 'id'>) => {
    if (!contact) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onUpdateContact(contact.id, data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null);
      onClose();
    }
  };

  if (!contact) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Contact">
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <ContactForm
          initialData={contact.toData()}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          submitLabel="Update Contact"
          isSubmitting={isSubmitting}
        />
      </div>
    </Modal>
  );
}