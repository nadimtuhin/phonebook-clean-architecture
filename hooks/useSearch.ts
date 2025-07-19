'use client';

import { useState, useMemo } from 'react';
import { Contact } from '@/lib/entities/contact';
import { SearchContactsUseCase } from '@/lib/use-cases/search-contacts';

const searchContactsUseCase = new SearchContactsUseCase();

export function useSearch(contacts: Contact[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => {
    return searchContactsUseCase.execute(contacts, searchTerm);
  }, [contacts, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredContacts,
  };
}