import React, { useState } from 'react';
import { ContactData } from '@/lib/entities/contact';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from '@/components/ContactForm';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (data: Omit<ContactData, 'id'>) => Promise<any>;
}

export function AddContactModal({ isOpen, onClose, onAddContact }: AddContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<ContactData, 'id'>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onAddContact(data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add contact');
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Contact">
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <ContactForm
          onSubmit={handleSubmit}
          onCancel={handleClose}
          submitLabel="Add Contact"
          isSubmitting={isSubmitting}
        />
      </div>
    </Modal>
  );
}