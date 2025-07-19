'use client';

import { useState, useEffect } from 'react';
import { Contact, ContactData } from '@/lib/entities/contact';
import { LocalStorageContactRepository } from '@/lib/adapters/repositories/local-storage-contact-repository';
import { AddContactUseCase } from '@/lib/use-cases/add-contact';
import { UpdateContactUseCase } from '@/lib/use-cases/update-contact';
import { DeleteContactUseCase } from '@/lib/use-cases/delete-contact';

const repository = new LocalStorageContactRepository();
const addContactUseCase = new AddContactUseCase(repository);
const updateContactUseCase = new UpdateContactUseCase(repository);
const deleteContactUseCase = new DeleteContactUseCase(repository);

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const loadedContacts = await repository.getAll();
      setContacts(loadedContacts);
      setError(null);
    } catch (err) {
      setError('Failed to load contacts');
      console.error('Error loading contacts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addContact = async (contactData: Omit<ContactData, 'id'>) => {
    try {
      const newContact = await addContactUseCase.execute(contactData);
      setContacts(prev => [...prev, newContact]);
      setError(null);
      return newContact;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add contact';
      setError(errorMessage);
      throw err;
    }
  };

  const updateContact = async (id: string, updates: Partial<ContactData>) => {
    try {
      const updatedContact = await updateContactUseCase.execute(id, updates);
      setContacts(prev => prev.map(contact => 
        contact.id === id ? updatedContact : contact
      ));
      setError(null);
      return updatedContact;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update contact';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await deleteContactUseCase.execute(id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete contact';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    contacts,
    isLoading,
    error,
    addContact,
    updateContact,
    deleteContact,
    selectedContact,
    setSelectedContact,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
  };
}