import React from 'react';
import { useContactForm } from '@/hooks/useContactForm';
import { ContactData } from '@/lib/entities/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface ContactFormProps {
  initialData?: Partial<ContactData>;
  onSubmit: (data: Omit<ContactData, 'id'>) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  isSubmitting?: boolean;
}

export function ContactForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  submitLabel,
  isSubmitting = false 
}: ContactFormProps) {
  const {
    formData,
    errors,
    updateField,
    addPhoneNumber,
    removePhoneNumber,
    updatePhoneNumber,
    addEmail,
    removeEmail,
    updateEmail,
    validateForm,
    getCleanedData,
  } = useContactForm(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(getCleanedData());
      } catch (error) {
        // Error handling is done in the parent component
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            error={errors.firstName}
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            error={errors.lastName}
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Numbers *
        </label>
        <div className="space-y-2">
          {formData.phoneNumbers.map((phone, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => updatePhoneNumber(index, e.target.value)}
                placeholder="(555) 123-4567"
                className="flex-1"
              />
              {formData.phoneNumbers.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removePhoneNumber(index)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={addPhoneNumber}
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Phone Number
          </Button>
        </div>
        {errors.phoneNumbers && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumbers[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Addresses *
        </label>
        <div className="space-y-2">
          {formData.emails.map((email, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => updateEmail(index, e.target.value)}
                placeholder="john@example.com"
                className="flex-1"
              />
              {formData.emails.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeEmail(index)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={addEmail}
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Email Address
          </Button>
        </div>
        {errors.emails && (
          <p className="mt-1 text-sm text-red-600">{errors.emails[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <Input
          type="text"
          value={formData.address}
          onChange={(e) => updateField('address', e.target.value)}
          placeholder="123 Main St, City, State 12345"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Additional notes..."
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
        <Button
          type="button"
          onClick={onCancel}
          variant="ghost"
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}