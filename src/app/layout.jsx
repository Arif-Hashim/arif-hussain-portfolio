import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Arif Hussain | Full Stack Web Developer (MERN Stack)',
  description: 'Official portfolio of Arif Hussain, Full Stack MERN Developer specializing in React, Next.js, Node.js, Express.js, MongoDB, and REST APIs.',
  keywords: ['Arif Hussain', 'MERN Stack Developer', 'Full Stack Developer', 'Next.js Portfolio', 'React Developer', 'Karachi Web Developer']
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0a0d14] text-gray-100 antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
