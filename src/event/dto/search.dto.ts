export class SearchDto {
  query: string;
  q: string;
  categoriesId: string[] = [];
  limit = 10;
}
