export interface ContactData {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumbers: string[];
  emails: string[];
  address?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Contact {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phoneNumbers: string[];
  public readonly emails: string[];
  public readonly address?: string;
  public readonly notes?: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: ContactData) {
    this.id = data.id || this.generateId();
    this.firstName = this.validateAndFormatName(data.firstName);
    this.lastName = this.validateAndFormatName(data.lastName);
    this.phoneNumbers = this.validatePhoneNumbers(data.phoneNumbers);
    this.emails = this.validateEmails(data.emails);
    this.address = data.address?.trim() || undefined;
    this.notes = data.notes?.trim() || undefined;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get initials(): string {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
  }

  get primaryPhone(): string {
    return this.phoneNumbers[0] || '';
  }

  get primaryEmail(): string {
    return this.emails[0] || '';
  }

  update(data: Partial<ContactData>): Contact {
    return new Contact({
      ...this.toData(),
      ...data,
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
  }

  toData(): ContactData {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumbers: this.phoneNumbers,
      emails: this.emails,
      address: this.address,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  private generateId(): string {
    return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private validateAndFormatName(name: string): string {
    if (!name || name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (name.trim().length > 50) {
      throw new Error('Name must be 50 characters or less');
    }
    return name.trim().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  private validatePhoneNumbers(phoneNumbers: string[]): string[] {
    if (!phoneNumbers || phoneNumbers.length === 0) {
      throw new Error('At least one phone number is required');
    }

    return phoneNumbers.map(phone => {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length < 10 || cleaned.length > 15) {
        throw new Error('Phone number must be 10-15 digits');
      }
      return this.formatPhoneNumber(cleaned);
    });
  }

  private validateEmails(emails: string[]): string[] {
    if (!emails || emails.length === 0) {
      throw new Error('At least one email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.map(email => {
      const trimmed = email.trim().toLowerCase();
      if (!emailRegex.test(trimmed)) {
        throw new Error('Invalid email format');
      }
      return trimmed;
    });
  }

  private formatPhoneNumber(phone: string): string {
    if (phone.length === 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone;
  }
}