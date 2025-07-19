import { ContactRepository } from '@/lib/adapters/repositories/contact-repository';

export class DeleteContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<void> {
    const existingContact = await this.contactRepository.getById(id);
    if (!existingContact) {
      throw new Error('Contact not found');
    }

    await this.contactRepository.delete(id);
  }
}