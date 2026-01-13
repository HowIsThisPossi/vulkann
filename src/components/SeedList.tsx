import { useEffect, useState } from 'react';
import { Sprout, Search, TrendingUp, Clock, Sun, Moon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Seed } from '../lib/database.types';
import type { Theme } from '../App';
import { SeedCard } from './SeedCard';

interface SeedListProps {
  onSeedClick: (seed: Seed) => void;
  theme: Theme;
  onThemeToggle: () => void;
}

type SortOption = 'popular' | 'recent';

export function SeedList({ onSeedClick, theme, onThemeToggle }: SeedListProps) {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  useEffect(() => {
    fetchSeeds();
  }, [sortBy]);

  const fetchSeeds = async () => {
    setLoading(true);
    const orderBy = sortBy === 'popular' ? 'views' : 'created_at';

    const { data, error } = await supabase
      .from('seeds')
      .select('*')
      .order(orderBy, { ascending: false });

    if (error) {
      console.error('Error fetching seeds:', error);
    } else {
      setSeeds(data || []);
    }
    setLoading(false);
  };

  const filteredSeeds = seeds.filter(
    (seed) =>
      seed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.seed_code.includes(searchQuery) ||
      seed.features.some((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      seed.biomes.some((b) =>
        b.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-yellow-50 to-amber-50' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
      <header className={`${theme === 'light' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 border-b-4 border-yellow-600' : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white border-b-4 border-gray-600'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout size={40} className={theme === 'light' ? 'text-yellow-900' : 'text-white'} />
              <h1 className="text-4xl font-bold">VulkanSeeds</h1>
            </div>
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
          <p className={`text-lg font-medium mt-4 ${theme === 'light' ? 'text-yellow-900' : 'text-gray-300'}`}>
            Discover the best Minecraft seeds for Java, Bedrock, and MCPE editions
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className={`mb-8 rounded-lg shadow-md p-4 ${theme === 'light' ? 'bg-white border border-yellow-200' : 'bg-gray-800 border border-gray-700'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <label htmlFor="seed-search" className="sr-only">Search seeds</label>
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}
                size={20}
              />
              <input
                id="seed-search"
                type="text"
                placeholder="Search seeds, features, biomes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg font-medium focus:outline-none transition-colors ${
                  theme === 'light'
                    ? 'border-2 border-yellow-200 bg-white text-gray-900 focus:border-yellow-400'
                    : 'border-2 border-gray-600 bg-gray-700 text-white focus:border-gray-500'
                }`}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  sortBy === 'popular'
                    ? theme === 'light'
                      ? 'bg-yellow-400 text-yellow-900 shadow-md'
                      : 'bg-blue-600 text-white shadow-md'
                    : theme === 'light'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <TrendingUp size={18} />
                <span>Popular</span>
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  sortBy === 'recent'
                    ? theme === 'light'
                      ? 'bg-yellow-400 text-yellow-900 shadow-md'
                      : 'bg-blue-600 text-white shadow-md'
                    : theme === 'light'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Clock size={18} />
                <span>Recent</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className={`inline-block animate-spin rounded-full h-12 w-12 border-4 mb-4 ${
                theme === 'light'
                  ? 'border-yellow-200 border-t-yellow-500'
                  : 'border-gray-700 border-t-blue-500'
              }`}></div>
              <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Loading amazing seeds...</p>
            </div>
          </div>
        ) : filteredSeeds.length === 0 ? (
          <div className="text-center py-20">
            <Search size={48} className={`mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`} />
            <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              No seeds found matching your search
            </p>
          </div>
        ) : (
          <>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Available Seeds
            </h2>
            <div className={`mb-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Showing {filteredSeeds.length} seed{filteredSeeds.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSeeds.map((seed) => (
                <SeedCard
                  key={seed.id}
                  seed={seed}
                  onClick={() => onSeedClick(seed)}
                  theme={theme}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className={`mt-16 py-8 ${theme === 'light' ? 'bg-yellow-900 text-yellow-100' : 'bg-gray-900 text-gray-300'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <p className="font-medium text-lg mb-2">
              VulkanSeeds - Your Ultimate Minecraft Seed Finder
            </p>
            <p className="text-sm">
              Find the best Minecraft seeds for Java Edition, Bedrock Edition, and MCPE
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-center mt-6 pt-6 border-t border-opacity-20 border-white">
            <div>
              <p className="font-semibold mb-1">Popular Seeds</p>
              <p className="opacity-75">Java • Bedrock • MCPE</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Features</p>
              <p className="opacity-75">Village Spawns • Biomes</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Editions</p>
              <p className="opacity-75">Java Edition • Bedrock</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Search</p>
              <p className="opacity-75">Quick Copy • Filter</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
