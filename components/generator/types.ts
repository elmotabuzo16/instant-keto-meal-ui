export interface Recipe {
  _id?: string;
  slug: string;
  name: string;
  description?: string;
  main_image?: string;
  totalTime?: string;
  servingCount?: string | number;
  calories?: string | number;
  carbs?: string | number;
  protein?: string | number;
  fat?: string | number;
  type?: string;
  viewCount?: string | number;
  userIdFavorite?: string[];
  tags?: Array<
    | string
    | {
        name: string;
        slug?: string;
        _id?: string;
      }
  >;
  ingredients?: Array<{
    name: string;
    size?: string;
    unit?: string;
    image?: string;
    _id?: string;
  }>;
  directions?: Array<{
    description: string;
    image?: string;
    _id?: string;
  }>;
  servings?: Array<{
    name: string;
    size?: string;
    unit?: string;
    _id?: string;
  }>;
}
