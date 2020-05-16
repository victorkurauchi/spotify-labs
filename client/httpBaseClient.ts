import axios, { AxiosInstance, AxiosError } from 'axios';

export interface HttpClientConfigInterface {
  baseUrl: string;
  headers?: any;
}

export default abstract class HttpBaseClient {
  private instance: AxiosInstance;
  protected get: Function;
  protected post: Function;
  protected delete: Function;
  protected put: Function;

  constructor(config: HttpClientConfigInterface) {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: config.headers || {
        'Content-type': 'application/json',
      }
    });

    this.get = this.instance.get.bind(this.instance);
    this.post = this.instance.post.bind(this.instance);
    this.put = this.instance.put.bind(this.instance);
    this.delete = this.instance.delete.bind(this.instance);
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }

  protected getResponseInterceptor() {
    return this.instance.interceptors.response;
  }

  protected handleError(error: AxiosError) {
    if (error?.response?.status === 400) {
      const { response } = error;
      const { data } = response;

      console.log(data.message);
      if (Array.isArray(data.message)) {
        const messages = data.message[0].messages.map((m: { message: string }) => m.message);
        throw new Error(messages);
      } else {
        throw new Error(data.message || 'Error while authenticating. Please try again');
      }
    }
    if (error?.response?.status === 401) throw new Error('Sorry, you are not authorized to see here :(');
    if (error?.response?.status === 404) throw new Error(error.response.data.message);

    if (error?.response?.status === 403) {
      console.log(error.response.data);
      throw new Error('Sorry, you are not allowed to see here :(');
    }
  }
}
