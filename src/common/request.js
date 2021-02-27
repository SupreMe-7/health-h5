import axios from 'axios';
import { getToken } from './util';
export function requestSuccessFunc(requestObj) {
    if (getToken()) {
        requestObj.headers.Authorization = getToken();
    }
    return requestObj;
}

export function requestFailFunc(requestError) {
    console.log(requestError);
    return Promise.reject(requestError);
}

export function responseSuccessFunc(responseObj) {
    // TODO: 如果返回的result为9 代表未登录 跳转到登录页
    const resData = responseObj.data;
    const { result } = resData;
    if (result === 9) {
        location.href = '/#/patients/login';
    }
    if (result !== 0) {
        return Promise.reject(resData);
    }
    return resData;
}

export function responseFailFunc(responseError) {
    return Promise.reject({ errMsg: '网络异常, 请稍后重试' });
}

const request = axios.create({
    timeout: 3000,
});

// 注入请求拦截
request.interceptors.request.use(requestSuccessFunc, requestFailFunc);
// 注入失败拦截
request.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default request;
