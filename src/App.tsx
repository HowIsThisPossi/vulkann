import { useState, useEffect } from 'react';
import { SeedList } from './components/SeedList';
import { SeedDetail } from './components/SeedDetail';
import { supabase } from './lib/supabase';
import { updateMetaTags, seedStructuredData } from './lib/seo';
import type { Seed } from './lib/database.types';

export type Theme = 'light' | 'dark';

function App() {
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSeedClick = async (seed: Seed) => {
    await supabase
      .from('seeds')
      .update({ views: seed.views + 1 })
      .eq('id', seed.id);

    const updatedSeed = { ...seed, views: seed.views + 1 };
    setSelectedSeed(updatedSeed);

    updateMetaTags({
      title: `${seed.title} - VulkanSeeds | Best Minecraft Seed`,
      description: seed.description || `Discover the ${seed.title} minecraft seed. Perfect for ${seed.version} edition.`,
      keywords: [
        'minecraft seeds',
        seed.title.toLowerCase(),
        seed.version,
        'seed finder',
        'best seeds'
      ],
      canonical: `https://vulkanseeds.bolt.host/?seed=${seed.id}`,
      structured: seedStructuredData(seed),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedSeed(null);

    updateMetaTags({
      title: 'VulkanSeeds – Best Minecraft Seeds for Java & Bedrock Edition',
      description: 'Discover the best Minecraft seeds for Java Edition, Bedrock Edition, and MCPE. Find village spawn seeds, beautiful landscapes, and more. Copy instantly!',
      keywords: [
        'minecraft seeds',
        'java seeds',
        'bedrock seeds',
        'mcpe seeds',
        'village spawn seeds',
        'minecraft pe seeds',
        'best seeds',
        'seed finder'
      ],
      canonical: 'https://vulkanseeds.bolt.host',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {selectedSeed ? (
        <SeedDetail seed={selectedSeed} onBack={handleBack} theme={theme} onThemeToggle={toggleTheme} />
      ) : (
        <SeedList onSeedClick={handleSeedClick} theme={theme} onThemeToggle={toggleTheme} />
      )}
    </>
  );
}

export default App;
