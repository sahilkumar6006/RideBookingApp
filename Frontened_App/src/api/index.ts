import axios, {AxiosResponse} from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {getStoredTokens} from '../methods/tokens';
import {store} from '../redux/store';
import {
  buttonLoader,
  startLoader,
  stopLoader,
} from '../redux/slices/activityIndicatorSlice';
import {addGetResponse} from '../redux/slices/getResponseSlice';
import {addParams, clearParams} from '../redux/slices/paramsSlice';
import Api from './interface';
import {addAlertData} from '../redux/slices/alertBoxSlice';

export const BASE_URL = 'https://pre-api.nearkidukan.in';
// export const BASE_URL =
//   'https://a146-2405-201-5023-486e-311e-24b4-b3d6-ca0e.ngrok-free.app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420',
    'x-api-key': 'tnkjaniidnvwonvwo',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const {jwt} = getStoredTokens();
    console.log('JWT: ', jwt);
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
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
    // Extract status and data from the error response

    const {status, data} = error.response || {};

    console.log('data message: ', data.message);

    // Log full error for debugging purposes
    console.log('Error: ', error);

    if (status === 401) {
      store.dispatch(
        addAlertData({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'Unauthorized Access. Please login again.',
        }),
      );
    } else if (status === 404) {
      store.dispatch(
        addAlertData({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'Resource not found. Please check the URL or try again later.',
        }),
      );
    } else if (status >= 400 && status < 500) {
      store.dispatch(
        addAlertData({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'An unexpected error occurred. Please try again.',
        }),
      );
    } else if (status >= 500) {
      store.dispatch(
        addAlertData({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'Server Error. Please try again later.',
        }),
      );
    } else {
      store.dispatch(
        addAlertData({
          type: 'Alert',
          message:
            data?.message ||
            data?.error ||
            'An unexpected error occurred. Please try again.',
        }),
      );
    }

    // Optional: Log the error to a monitoring service like Sentry, etc.
    console.error('Error intercepted:', error);

    return Promise.reject(error);
  },
);

// Create a queue to hold pending requests
// const requestQueue: ((token: string) => void)[] = [];
// let isRefreshing = false;

const executeRequest = async <T,>(
  requestFunction: (
    path: string,
    data?: any,
  ) => Promise<AxiosResponse<Api & T, any>>,
  path: string,
  data?: any,
  multipart: boolean = false,
  type: string = 'post',
  onSuccess?: () => void,
) => {
  const {isConnected} = await NetInfo.fetch();
  try {
    if (!isConnected) {
      throw new Error('No Internet connection');
    }

    store.dispatch(startLoader());
    store.dispatch(buttonLoader());
    store.dispatch(clearParams());

    let response: AxiosResponse<Api & T, any>;

    if (multipart) {
      const config = {
        method: type,
        url: BASE_URL + path,
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [
          (data1: any) => {
            return data1;
          },
        ],
        data: data,
      };
      response = await axiosInstance.request(config);
    } else {
      response = await requestFunction(path, data);
    }
    if (response.data.message) {
      store.dispatch(
        addAlertData({
          type: 'Message',
          message: response.data.message,
          onSuccess: onSuccess,
        }),
      );
    }
    //! Toast message here to show completion of POST/PUT request
    return response?.data;
  } catch (error: any) {
    console.log(
      'Error in this path: ' +
        path +
        ' ( status : ' +
        error.status +
        ', message: ' +
        error.message +
        ' )',
    );

    // console.log('Here i am: ', error);

    // store.dispatch(
    //   addAlertData({
    //     type: 'Alert',
    //     message:
    //       error?.data?.message ??
    //       'Something went wrong, please try again later.',
    //   }),
    // );
    throw error;
  } finally {
    store.dispatch(stopLoader());
  }
};

const get = async <T,>({
  path,
  params,
  noLoader = false,
}: {
  path: string;
  params?: any;
  noLoader?: boolean;
}): Promise<T> => {
  let persistedState = store.getState().getResponseState[path];
  const {isConnected} = await NetInfo.fetch();
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
    const response = await axiosInstance.get<any>(path);
    store.dispatch(addGetResponse({path, response: response?.data}));
    return response?.data;
  } catch (error: any) {
    console.log(
      'Error in this path: ' +
        path +
        ' ( status : ' +
        error.status +
        ', message: ' +
        error.message,
      +' )',
    );
    persistedState = store.getState().getResponseState[path];

    if (!persistedState) {
      console.log('Persisted state in get req not found', error.message);
    }
    return persistedState;
  } finally {
    if (!noLoader) {
      store.dispatch(stopLoader());
    }
  }
};

const post = async <T,>({
  path,
  data,
  isUrlEncoded = false,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data?: any;
  isUrlEncoded?: boolean;
  multipart?: boolean;
  onSuccess?: () => void;
}) => {
  if (isUrlEncoded) {
    const body = new URLSearchParams();
    const keys = Object.keys(data);
    keys.map((key) => {
      body.append(key, data[key]);
    });
    return executeRequest<Api & T>(
      axiosInstance.post,
      path,
      body.toString(),
      multipart,
      'post',
      onSuccess,
    );
  }
  return executeRequest<Api & T>(
    axiosInstance.post,
    path,
    data,
    multipart,
    'post',
    onSuccess,
  );
};

const put = async <T,>({
  path,
  data,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  multipart?: boolean;
  onSuccess?: () => void;
}) => {
  return executeRequest<Api & T>(
    axiosInstance.put,
    path,
    data,
    multipart,
    'put',
    onSuccess,
  );
};

const patch = async <T,>({
  path,
  data,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data?: any;
  multipart?: boolean;
  onSuccess?: () => void;
}) => {
  return executeRequest<Api & T>(
    axiosInstance.patch,
    path,
    data,
    multipart,
    'patch',
    onSuccess,
  );
};

const deleteApi = async <T,>({
  path,
  data,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data?: any;
  multipart?: boolean;
  onSuccess?: () => void;
}) => {
  return executeRequest<Api & T>(
    axiosInstance.delete,
    path,
    data,
    multipart,
    'delete',
    onSuccess,
  );
};
export {axiosInstance as http, get, post, put, patch, deleteApi};
