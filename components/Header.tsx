import React from 'react';
import { Plus, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onAddContact: () => void;
}

export function Header({ onAddContact }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-xl">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Phone Book</h1>
          <p className="text-gray-500">Manage your contacts</p>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-0">
        <Button
          onClick={onAddContact}
          className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Contact</span>
        </Button>
      </div>
    </div>
  );
}