import './globals.css';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Website BKAD Kota Bogor',
  description: 'Website resmi Badan Keuangan dan Aset Daerah Kota Bogor.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}