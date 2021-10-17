export interface IEvent {
  id?: string;
  userId: string;
  name?: string;
  date?: string;
  email?: string;
  whatsapp?: string;
  description: string;
  tags: string[];
  icon: string;
  helperTags: string[];
  images: string[];
  latitude: number;
  longitude: number;
  categoriesId: string[];
}
