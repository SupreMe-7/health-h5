import axios from 'axios';

// 添加响应拦截器 TODO: 判断是否返回正确
const responseSuccess = res => {
    console.log('xxx', res);
    return res;
};
const responseFail = err => {
    console.log('xxxssss', err);
    err.response.status;
    return err;
};

axios.interceptors.response.use(responseSuccess, responseFail);

const request = axios.create({
    timeout: 3000,
    headers: { 'X-Custom-Header': 'foobar', Authorization: 'xxxx' },
});

export default request;
