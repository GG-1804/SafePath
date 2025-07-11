'use client';

import dynamic from 'next/dynamic';

// Dynamically import the SafePath component, disabling SSR
const SafePath = dynamic(() => import('./Safepath'), {
  ssr: false,
});

export default SafePath;
