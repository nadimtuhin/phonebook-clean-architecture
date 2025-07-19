import React from 'react';
import { Contact } from '@/lib/entities/contact';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar name={contact.fullName} />
          <div>
            <h3 className="font-semibold text-gray-900">{contact.fullName}</h3>
          </div>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-primary-500"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm">
          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <a 
            href={`tel:${contact.primaryPhone}`}
            className="text-gray-600 hover:text-primary-500 transition-colors"
          >
            {contact.primaryPhone}
          </a>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <a 
            href={`mailto:${contact.primaryEmail}`}
            className="text-gray-600 hover:text-primary-500 transition-colors truncate"
          >
            {contact.primaryEmail}
          </a>
        </div>

        {contact.address && (
          <div className="flex items-start space-x-3 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600 line-clamp-2">{contact.address}</span>
          </div>
        )}

        {contact.phoneNumbers.length > 1 && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
            +{contact.phoneNumbers.length - 1} more phone number{contact.phoneNumbers.length > 2 ? 's' : ''}
          </div>
        )}

        {contact.emails.length > 1 && (
          <div className="text-xs text-gray-500">
            +{contact.emails.length - 1} more email{contact.emails.length > 2 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}