import './globals.css';
import Navbar from '@/components/Navbar';
import MysticalBackground from '@/components/MysticalBackground';

export const metadata = {
  title: 'KAI NOKKI | AI Jothishyan • Parody Palm Reader',
  description: 'A dramatic, funny, Kerala-style AI palm reading website for entertainment.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-purple-500 selection:text-white">
        <MysticalBackground />
        <Navbar />
        <main className="relative z-10 flex-1 flex flex-col justify-center px-4 py-6 sm:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        
        <footer className="relative z-10 w-full py-4 text-center text-[11px] text-slate-500 font-mono border-t border-purple-900/20 bg-slate-950/60 backdrop-blur-md">
          <p>🔮 KAI NOKKI is an AI-generated entertainment & parody experience. Palm readings are fictional.</p>
        </footer>
      </body>
    </html>
  );
}
