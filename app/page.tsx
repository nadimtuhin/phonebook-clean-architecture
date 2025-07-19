'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ContactList } from '@/components/ContactList';
import { AddContactModal } from '@/components/AddContactModal';
import { EditContactModal } from '@/components/EditContactModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { useContacts } from '@/hooks/useContacts';
import { useSearch } from '@/hooks/useSearch';

export default function Home() {
  const {
    contacts,
    isLoading,
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
  } = useContacts();

  const { searchTerm, setSearchTerm, filteredContacts } = useSearch(contacts);

  const handleEditContact = (contact: any) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleDeleteContact = (contact: any) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header onAddContact={() => setShowAddModal(true)} />
        
        <div className="mt-8">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultCount={filteredContacts.length}
          />
        </div>

        <div className="mt-8">
          <ContactList
            contacts={filteredContacts}
            isLoading={isLoading}
            onEditContact={handleEditContact}
            onDeleteContact={handleDeleteContact}
          />
        </div>

        <AddContactModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddContact={addContact}
        />

        <EditContactModal
          isOpen={showEditModal}
          contact={selectedContact}
          onClose={() => setShowEditModal(false)}
          onUpdateContact={updateContact}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          contact={selectedContact}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (selectedContact) {
              deleteContact(selectedContact.id);
              setShowDeleteModal(false);
            }
          }}
        />
      </div>
    </div>
  );
}