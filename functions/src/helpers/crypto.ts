import * as crypto from "crypto";

export function createHash(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
} 