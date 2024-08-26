import type { App } from 'vue';

export function registerPlugins(app: App<Element>): void {
  const imports: Record<string, { default: (app: App<Element>) => void }> = import.meta.glob(
    ['@/plugins/*.{ts,js}', '@/plugins/*/index.{ts,js}'],
    { eager: true }
  );

  const importPaths: string[] = Object.keys(imports).sort();

  importPaths.forEach((path: string) => {
    const pluginImportModule: { default: (app: App<Element>) => void } = imports[path];

    pluginImportModule.default?.(app);
  });
}
