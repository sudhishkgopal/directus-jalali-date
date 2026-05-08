declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@directus/extensions-sdk' {
  export function defineInterface(config: any): any;
}

// Global declarations for Directus theme variables
declare global {
  interface Window {
    // Add any global window properties if needed
  }
}

export {};
