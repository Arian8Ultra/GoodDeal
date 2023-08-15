import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'good.deal',
  appName: 'good-deal',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
