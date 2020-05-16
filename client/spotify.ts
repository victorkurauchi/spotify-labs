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
}
