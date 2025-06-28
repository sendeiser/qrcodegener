
import React from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { QrCodeIcon } from './components/icons/QrCodeIcon';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans p-4 text-slate-800 dark:text-slate-200">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-slate-200 dark:bg-slate-800 p-4 rounded-full mb-4">
             <QrCodeIcon className="w-10 h-10 text-violet-500" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            QR Code Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Enter any URL to instantly create your QR code.
          </p>
        </header>

        <main>
          <QRCodeGenerator />
        </main>
        
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-500">
          <p>Powered by React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
