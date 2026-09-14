import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { writingBySlug } from '@apsite/content';

export function essayBody(slug: string): string {
  const w = writingBySlug(slug);
  if (!w) throw new Error(`unknown essay ${slug}`);
  return readFileSync(join(process.cwd(), 'content/writing', w.file), 'utf8');
}
