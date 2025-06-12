import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { store } from '../redux/store';
import {
  buttonLoader,
  startLoader,
  stopLoader,
} from '../redux/slices/activityIndicatorSlice';
import { addGetResponse } from '../redux/slices/getResponseSlice';
import { addParams, clearParams } from '../redux/slices/paramsSlice';
import { getStoredTokens } from '../methods/tokens';
import { showAlert } from '../redux/slices/alertSlice';
import NetInfo from '@react-native-community/netinfo';

export const BASE_URL = 'https://ridebookingapp-backened-1.onrender.com/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420',
    'x-api-key': 'tnkjaniidnvwonvwo',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { jwt } = await getStoredTokens();
    console.log('JWT: ', jwt);
    if (jwt) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${jwt}`;
      } else {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${jwt}`;
      }
    }
    return config;
  },
  (error) => {
    console.log('error in axios request interceptor:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status, data } = error.response || {};

    console.log('data message: ', data?.message);

    console.log('Error: ', error);

    if (status === 401) {
      store.dispatch(
        showAlert({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'Unauthorized Access. Please login again.',
          onSuccess: undefined,
        }),
      );
    } else if (status === 404) {
      store.dispatch(
        showAlert({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'Resource not found. Please check the URL or try again later.',
          onSuccess: undefined,
        }),
      );
    } else if (status >= 400 && status < 500) {
      store.dispatch(
        showAlert({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'An unexpected error occurred. Please try again.',
          onSuccess: undefined,
        }),
      );
    } else if (status >= 500) {
      store.dispatch(
        showAlert({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'Server Error. Please try again later.',
          onSuccess: undefined,
        }),
      );
    } else {
      store.dispatch(
        showAlert({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'An unexpected error occurred. Please try again.',
          onSuccess: undefined,
        }),
      );
    }

    console.error('Error intercepted:', error);

    return Promise.reject(error);
  },
);

const executeRequest = async <T>(
  requestFunction: (
    path: string,
    data?: Record<string, unknown> | FormData | string,
  ) => Promise<AxiosResponse<T>>,
  path: string,
  data?: Record<string, unknown> | FormData | string,
  multipart: boolean = false,
  type: string = 'post',
  onSuccess?: () => void,
): Promise<T | undefined> => {
  const { isConnected } = await NetInfo.fetch();
  try {
    if (!isConnected) {
      throw new Error('No Internet connection');
    }

    store.dispatch(startLoader());
    store.dispatch(buttonLoader());
    store.dispatch(clearParams());

    let response: AxiosResponse<T>;

    if (multipart) {
      const config: AxiosRequestConfig = {
        method: type as AxiosRequestConfig['method'],
        url: BASE_URL + path,
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [
          (data1: unknown) => {
            return data1;
          },
        ],
        data: data,
      };
      response = await axiosInstance.request<T>(config);
    } else {
      response = await requestFunction(path, data);
    }
    if ((response.data as Record<string, unknown>)?.message) {
      store.dispatch(
        showAlert({
          type: 'Message',
          message: (response.data as Record<string, unknown>).message as string,
          onSuccess: onSuccess,
        }),
      );
    }
    return response?.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
      console.log(
        'Error in this path: ' +
          path +
          ' ( status : ' +
          (error as { status: string }).status +
          ', message: ' +
          (error as { message: string }).message +
          ' )',
      );
    } else {
      console.log('Error in this path: ' + path, error);
    }
    throw error;
  } finally {
    store.dispatch(stopLoader());
  }
};

const get = async <T>({
  path,
  params,
  noLoader = false,
}: {
  path: string;
  params?: Record<string, unknown>;
  noLoader?: boolean;
}): Promise<T | undefined> => {
  let persistedState = store.getState().getResponseState[path] as T | undefined;
  const { isConnected } = await NetInfo.fetch();
  try {
    if (!isConnected) {
      if (!persistedState) {
        throw new Error('No internet connection');
      }
      return persistedState;
    }
    if (!noLoader) {
      store.dispatch(startLoader());
    }
    store.dispatch(addParams(params));
    const response = await axiosInstance.get<T>(path);
    store.dispatch(addGetResponse({ path, response: response?.data }));
    return response?.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
      console.log(
        'Error in this path: ' +
          path +
          ' ( status : ' +
          (error as { status: string }).status +
          ', message: ' +
          (error as { message: string }).message +
          ' )',
      );
    } else {
      console.log('Error in this path: ' + path, error);
    }
    persistedState = store.getState().getResponseState[path] as T | undefined;

    if (!persistedState) {
      console.log('Persisted state in get req not found', (error as Error).message);
    }
    return persistedState;
  } finally {
    if (!noLoader) {
      store.dispatch(stopLoader());
    }
  }
};

const post = async <T>({
  path,
  data,
  isUrlEncoded = false,
  multipart = false,
}: {
  path: string;
  data?: Record<string, unknown> | FormData;
  isUrlEncoded?: boolean;
  multipart?: boolean;
}): Promise<T | undefined> => {
  if (isUrlEncoded && data && typeof data === 'object' && !(data instanceof FormData)) {
    const body = new URLSearchParams();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      body.append(key, String((data as Record<string, unknown>)[key]));
    });
    return executeRequest<T>(
      axiosInstance.post,
      path,
      body.toString(),
      multipart,
      'post'
    );
  }
  return executeRequest<T>(
    axiosInstance.post,
    path,
    data,
    multipart,
    'post'
  );
};

const put = async <T>({
  path,
  data,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data: Record<string, unknown> | FormData;
  multipart?: boolean;
  onSuccess?: () => void;
}): Promise<T | undefined> => {
  return executeRequest<T>(
    axiosInstance.put,
    path,
    data,
    multipart,
    'put',
    onSuccess,
  );
};

const patch = async <T>({
  path,
  data,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data?: Record<string, unknown> | FormData;
  multipart?: boolean;
  onSuccess?: () => void;
}): Promise<T | undefined> => {
  return executeRequest<T>(
    axiosInstance.patch,
    path,
    data,
    multipart,
    'patch',
    onSuccess,
  );
};

const deleteApi = async <T>({
  path,
  data,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data?: Record<string, unknown> | FormData;
  multipart?: boolean;
  onSuccess?: () => void;
}): Promise<T | undefined> => {
  return executeRequest<T>(
    axiosInstance.delete,
    path,
    data,
    multipart,
    'delete',
    onSuccess,
  );
};

export { axiosInstance as http, get, post, put, patch, deleteApi };
