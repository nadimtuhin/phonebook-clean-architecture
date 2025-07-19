'use client';

import { useState } from 'react';
import { ContactData } from '@/lib/entities/contact';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumbers?: string[];
  emails?: string[];
  address?: string;
  notes?: string;
}

export function useContactForm(initialData?: Partial<ContactData>) {
  const [formData, setFormData] = useState<Omit<ContactData, 'id'>>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    phoneNumbers: initialData?.phoneNumbers || [''],
    emails: initialData?.emails || [''],
    address: initialData?.address || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const addPhoneNumber = () => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ''],
    }));
  };

  const removePhoneNumber = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
    }));
  };

  const updatePhoneNumber = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.map((phone, i) => 
        i === index ? value : phone
      ),
    }));
  };

  const addEmail = () => {
    setFormData(prev => ({
      ...prev,
      emails: [...prev.emails, ''],
    }));
  };

  const removeEmail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index),
    }));
  };

  const updateEmail = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.map((email, i) => 
        i === index ? value : email
      ),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const validPhones = formData.phoneNumbers.filter(phone => phone.trim());
    if (validPhones.length === 0) {
      newErrors.phoneNumbers = ['At least one phone number is required'];
    }

    const validEmails = formData.emails.filter(email => email.trim());
    if (validEmails.length === 0) {
      newErrors.emails = ['At least one email is required'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCleanedData = (): Omit<ContactData, 'id'> => {
    return {
      ...formData,
      phoneNumbers: formData.phoneNumbers.filter(phone => phone.trim()),
      emails: formData.emails.filter(email => email.trim()),
    };
  };

  return {
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
  };
}