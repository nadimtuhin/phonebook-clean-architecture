import React from 'react';
import { Contact } from '@/lib/entities/contact';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  contact: Contact | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ 
  isOpen, 
  contact, 
  onClose, 
  onConfirm 
}: DeleteConfirmModalProps) {
  if (!contact) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Contact">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Delete {contact.fullName}?
            </h3>
            <p className="text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600">
            <p><strong>Phone:</strong> {contact.primaryPhone}</p>
            <p><strong>Email:</strong> {contact.primaryEmail}</p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Contact
          </Button>
        </div>
      </div>
    </Modal>
  );
}