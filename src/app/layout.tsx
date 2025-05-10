import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'MacroSnap - Track Your Macros',
  description: 'Easily track your daily macronutrient intake with MacroSnap. Features AI suggestions, quick adds, and progress tracking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased", 
        GeistSans.variable, 
        GeistMono.variable
      )}>
        {children}
      </body>
    </html>
  );
}
