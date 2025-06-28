
import React, { useState, useRef } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

// This lets TypeScript know that QRCode is available globally from the script tag
declare const QRCode: {
  toDataURL(
    text: string,
    options: object,
    callback: (err: Error | null, url: string) => void
  ): void;
  toDataURL(text: string, options?: object): Promise<string>;
};

export const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const qrImageRef = useRef<HTMLImageElement>(null);

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL.');
      setQrCodeDataUrl(null);
      return;
    }
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      setQrCodeDataUrl(null);
      return;
    }

    setError(null);
    setIsLoading(true);
    setQrCodeDataUrl(null);

    try {
      const options = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.98,
        margin: 1,
        width: 320,
        color: {
          dark: '#020617', // slate-950
          light: '#ffffff',
        },
      };
      const dataUrl = await QRCode.toDataURL(url, options);
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg transition-colors duration-300">
      <form onSubmit={handleGenerate} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://www.google.com"
            className="flex-grow w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow"
            aria-label="URL to generate QR code for"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-white dark:focus:ring-offset-slate-800 disabled:bg-violet-400 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate QR'
            )}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      
      {qrCodeDataUrl && (
        <div className="mt-8 text-center animate-fade-in">
          <div className="relative inline-block p-4 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-inner">
            <img
              ref={qrImageRef}
              src={qrCodeDataUrl}
              alt="Generated QR Code"
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-lg"
            />
          </div>
          <div className="mt-6">
            <a
              href={qrCodeDataUrl}
              download="qrcode.png"
              className="inline-flex items-center gap-2 px-5 py-3 font-medium text-violet-600 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/20 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-colors"
            >
              <DownloadIcon className="w-5 h-5" />
              Download PNG
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
