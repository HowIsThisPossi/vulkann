import { Eye } from 'lucide-react';
import type { Seed } from '../lib/database.types';
import type { Theme } from '../App';

interface SeedCardProps {
  seed: Seed;
  onClick: () => void;
  theme: Theme;
}

export function SeedCard({ seed, onClick, theme }: SeedCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
        theme === 'light'
          ? 'bg-white border border-yellow-200'
          : 'bg-gray-800 border border-gray-700'
      }`}
    >
      <div className={`relative h-32 overflow-hidden flex items-center justify-center ${
        theme === 'light'
          ? 'bg-gradient-to-br from-yellow-100 to-amber-100'
          : 'bg-gradient-to-br from-gray-700 to-gray-600'
      }`}>
        <span className={`text-5xl font-bold ${theme === 'light' ? 'text-yellow-700' : 'text-blue-400'}`}>VS</span>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
            theme === 'light'
              ? 'bg-yellow-400 text-yellow-900'
              : 'bg-blue-600 text-white'
          }`}>
            {seed.edition}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
            theme === 'light'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-blue-500 text-white'
          }`}>
            {seed.version}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className={`font-bold text-lg mb-2 line-clamp-1 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          {seed.title}
        </h3>

        <p className={`text-sm mb-3 line-clamp-2 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {seed.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {seed.features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-1 rounded-full ${
                theme === 'light'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-900 text-blue-200'
              }`}
            >
              {feature}
            </span>
          ))}
          {seed.features.length > 3 && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'light'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-900 text-blue-200'
            }`}>
              +{seed.features.length - 3}
            </span>
          )}
        </div>

        <div className={`flex items-center justify-between text-xs ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <code className={`px-2 py-1 rounded font-mono ${
            theme === 'light'
              ? 'bg-gray-100'
              : 'bg-gray-700'
          }`}>
            {seed.seed_code.length > 15
              ? `${seed.seed_code.slice(0, 15)}...`
              : seed.seed_code}
          </code>
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>{seed.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
