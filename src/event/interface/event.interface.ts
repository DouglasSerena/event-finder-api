export interface IEvent {
  id?: string;
  name?: string;
  date?: string;
  address?: string;
  description: string;
  tags: string[];
  icon: string;
  helperTags: string[];
  images: string[];
  latitude: number;
  longitude: number;
  categoriesId: string[];
}
