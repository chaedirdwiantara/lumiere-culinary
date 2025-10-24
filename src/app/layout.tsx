import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lumiere Culinary Portfolio',
  description: 'Elegant food photography showcasing culinary artistry through the lens of creativity and passion',
  keywords: ['food photography', 'culinary', 'portfolio', 'photography', 'lumiere'],
  authors: [{ name: 'Lumiere Photography' }],
  openGraph: {
    title: 'Lumiere Culinary Portfolio',
    description: 'Elegant food photography showcasing culinary artistry',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}