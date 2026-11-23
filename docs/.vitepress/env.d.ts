/// <reference types="vitepress/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module 'node:fs' {
  export function existsSync(path: string): boolean
  export function readFileSync(path: string, encoding: 'utf8'): string
  const fs: {
    existsSync(path: string): boolean
    readFileSync(path: string, encoding: 'utf8'): string
  }
  export default fs
}

declare module 'node:path' {
  export function resolve(...paths: string[]): string
  const path: {
    resolve(...paths: string[]): string
  }
  export default path
}

declare const process: {
  env: Record<string, string | undefined>
  cwd(): string
}
