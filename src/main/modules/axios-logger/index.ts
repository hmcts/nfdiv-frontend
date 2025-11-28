import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Application } from 'express';

export class AxiosLogger {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      return;
    }

    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      console.debug(
        `Sending "${config.method?.toUpperCase()}" request to: "${config.baseURL || ''}${config.url}" data:`,
        config.data ? JSON.stringify(config.data, null, 2) : '{}'
      );
      return config;
    });

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        console.debug(
          `Received response "${response.status} ${response.statusText}" from: "${response.config.baseURL || ''}${
            response.config.url
          }" content type: "${response.headers['content-type']}" data:`,
          response.data ? JSON.stringify(response.data, null, 2) : '{}'
        );
        return response;
      },
      error => {
        if (error.response) {
          console.debug(
            `Received error "${error.response.status} ${error.response.statusText}" from: "${
              error.response.config.baseURL || ''
            }${error.response.config.url}" content type: "${error.response.headers['content-type']}" data:`,
            error.response.data ? JSON.stringify(error.response.data, null, 2) : '{}'
          );
        } else {
          console.debug('Axios request failed:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }
}
