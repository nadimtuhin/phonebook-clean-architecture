# Phonebook Clean Architecture

A modern phonebook application built with Next.js, TypeScript, and Clean Architecture principles. This application demonstrates a well-structured approach to building scalable React applications with proper separation of concerns.

## 🚀 Live Demo

**[View Live Application](https://phonebook-clean-architecture-1bzgxketu-nadim-tuhins-projects.vercel.app)**

Try the app live to see all features in action!

## Features

- **Contact Management**: Add, edit, delete, and view contacts
- **Multiple Contact Methods**: Support for multiple phone numbers and email addresses
- **Search Functionality**: Search through contacts by name, phone, or email
- **Responsive Design**: Mobile-first design that works on all devices
- **Clean Architecture**: Proper separation between entities, use cases, and UI components
- **Type Safety**: Full TypeScript implementation for better developer experience

## Architecture

This project follows Clean Architecture principles with clear separation of layers:

### Entities (`/lib/entities/`)
- `contact.ts` - Core business entities and rules

### Use Cases (`/lib/use-cases/`)
- `add-contact.ts` - Business logic for adding contacts
- `update-contact.ts` - Business logic for updating contacts
- `delete-contact.ts` - Business logic for deleting contacts
- `search-contacts.ts` - Business logic for searching contacts

### Repositories (`/lib/adapters/repositories/`)
- `contact-repository.ts` - Abstract repository interface
- `local-storage-contact-repository.ts` - Local storage implementation

### UI Components (`/components/`)
- Modular, reusable React components
- Form handling with custom hooks
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 13.5.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Storage**: Local Storage (easily replaceable with other adapters)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nadimtuhin/phonebook-clean-architecture.git
cd phonebook-clean-architecture
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── ContactCard.tsx   # Contact display component
│   ├── ContactForm.tsx   # Contact form component
│   ├── ContactList.tsx   # Contact list component
│   └── ...               # Other components
├── hooks/                # Custom React hooks
│   ├── useContacts.ts    # Contact management hook
│   ├── useContactForm.ts # Form handling hook
│   └── useSearch.ts      # Search functionality hook
├── lib/                  # Core business logic
│   ├── entities/         # Business entities
│   ├── use-cases/        # Business use cases
│   ├── adapters/         # Infrastructure adapters
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## Key Features Explained

### Clean Architecture Benefits

1. **Testability**: Business logic is isolated and easily testable
2. **Maintainability**: Clear separation of concerns makes code easier to maintain
3. **Flexibility**: Easy to swap implementations (e.g., replace local storage with API)
4. **Scalability**: Well-structured foundation for growing applications

### Contact Management

- Add contacts with multiple phone numbers and emails
- Edit existing contact information
- Delete contacts with confirmation
- View contacts in a responsive card layout

### Search and Filter

- Real-time search across all contact fields
- Debounced search for better performance
- Case-insensitive matching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).