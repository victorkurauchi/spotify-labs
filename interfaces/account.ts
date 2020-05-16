export interface SpotifyAccountInterface {
  country: string;
  id: number;
  display_name: string;
  email: string;
  followers: { href: any, total: number };
  href: string;
  images: { height?: number, url: string; width?: number }[];
}
