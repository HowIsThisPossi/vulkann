export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  structured?: Record<string, unknown>;
}

export const updateMetaTags = (meta: SEOMetadata) => {
  document.title = meta.title;

  updateOrCreateMetaTag('description', meta.description);
  if (meta.keywords) {
    updateOrCreateMetaTag('keywords', meta.keywords.join(', '));
  }
  updateOrCreateMetaTag('og:title', meta.title, 'property');
  updateOrCreateMetaTag('og:description', meta.description, 'property');
  if (meta.image) {
    updateOrCreateMetaTag('og:image', meta.image, 'property');
    updateOrCreateMetaTag('twitter:image', meta.image);
  }
  if (meta.canonical) {
    updateCanonical(meta.canonical);
  }
  if (meta.structured) {
    updateStructuredData(meta.structured);
  }
};

const updateOrCreateMetaTag = (name: string, content: string, attr = 'name') => {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const updateCanonical = (url: string) => {
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
};

const updateStructuredData = (data: Record<string, unknown>) => {
  let script = document.querySelector('script[data-seed-structured]') as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seed-structured', 'true');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });
};

export const seedStructuredData = (seed: {
  id: string;
  title: string;
  description: string;
  seed_value: string;
  version: string;
}) => ({
  '@type': 'Thing',
  name: seed.title,
  description: seed.description,
  identifier: seed.seed_value,
  properties: {
    version: seed.version,
    seedValue: seed.seed_value,
  },
});
