export type SearchItemType = 'user' | 'merchant';

export interface SearchResult {
  id: string;
  type: SearchItemType;
  name: string;
  code: string;
}
