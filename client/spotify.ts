import HttpBaseClient from './httpBaseClient';
import { getHost } from '../utils/config';

export default class SpotifyClient extends HttpBaseClient {
  constructor() {
    super({ baseUrl: getHost() });
    const token = window.localStorage.getItem('token');
    this.getInstance().defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async me(): Promise<any> {
    try {
      const response = await this.get('/me');
      return response.data;
    } catch (error) {
      this.handleError(error);

      throw error;
    }
  }

  // POST https://api.spotify.com/v1/playlists/{playlist_id}/tracks
  async addTracksToPlaylist(id: number, data: any): Promise<any> {
    try {
      const response = await this.post(`/playlists/${id}/tracks`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);

      throw error;
    }
  }
}
