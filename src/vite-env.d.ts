import type { DefineComponent } from 'react'

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string
  readonly VITE_PUBLIC_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}