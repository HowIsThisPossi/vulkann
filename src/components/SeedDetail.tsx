import { ArrowLeft, Copy, Check, Eye, Calendar, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import type { Seed } from '../lib/database.types';
import type { Theme } from '../App';

interface SeedDetailProps {
  seed: Seed;
  onBack: () => void;
  theme: Theme;
  onThemeToggle: () => void;
}

export function SeedDetail({ seed, onBack, theme, onThemeToggle }: SeedDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(seed.seed_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-yellow-50 to-amber-50' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 transition-colors ${
              theme === 'light'
                ? 'text-yellow-900 hover:text-yellow-700'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Seeds</span>
          </button>
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-lg transition-all ${
              theme === 'light'
                ? 'bg-yellow-300 text-yellow-900 hover:bg-yellow-200'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'light'
            ? 'bg-white border border-yellow-200'
            : 'bg-gray-800 border border-gray-700'
        }`}>
          <div className={`relative h-48 flex items-center justify-center ${
            theme === 'light'
              ? 'bg-gradient-to-br from-yellow-100 to-amber-100'
              : 'bg-gradient-to-br from-gray-700 to-gray-600'
          }`}>
            <span className={`text-8xl font-bold ${theme === 'light' ? 'text-yellow-700' : 'text-blue-400'}`}>VS</span>
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <span className={`px-4 py-2 rounded-lg text-sm font-bold shadow-md inline-block ${
                theme === 'light'
                  ? 'bg-yellow-400 text-yellow-900'
                  : 'bg-blue-600 text-white'
              }`}>
                {seed.edition}
              </span>
              <span className={`px-4 py-2 rounded-lg text-sm font-bold shadow-md inline-block ${
                theme === 'light'
                  ? 'bg-amber-400 text-amber-900'
                  : 'bg-blue-500 text-white'
              }`}>
                {seed.version}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h1 className={`text-4xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {seed.title}
            </h1>

            <div className={`flex items-center gap-6 text-sm mb-6 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{seed.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(seed.created_at)}</span>
              </div>
            </div>

            <div className={`rounded-lg p-6 mb-8 ${
              theme === 'light'
                ? 'bg-yellow-50 border-2 border-yellow-300'
                : 'bg-gray-700 border-2 border-gray-600'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium mb-2 ${
                    theme === 'light'
                      ? 'text-yellow-800'
                      : 'text-gray-300'
                  }`}>
                    Seed Code
                  </p>
                  <code className={`text-2xl font-mono font-bold ${
                    theme === 'light'
                      ? 'text-yellow-900'
                      : 'text-blue-300'
                  }`}>
                    {seed.seed_code}
                  </code>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg ${
                    theme === 'light'
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      <span>Copy Seed</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Description
              </h2>
              <p className={`text-lg leading-relaxed ${
                theme === 'light'
                  ? 'text-gray-700'
                  : 'text-gray-300'
              }`}>
                {seed.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {seed.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-full font-medium ${
                        theme === 'light'
                          ? 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                          : 'bg-blue-900 text-blue-200 border border-blue-700'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Biomes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {seed.biomes.map((biome, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-full font-medium ${
                        theme === 'light'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-green-900 text-green-200 border border-green-700'
                      }`}
                    >
                      {biome}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
