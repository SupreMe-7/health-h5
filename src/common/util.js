export const jsBridge = window.test || {};
export const getToken = () => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        return jsBridge.getToken && jsBridge.getToken();
    } else {
        return localStorage.getItem('TOKEN');
    }
};

export const setToken = (token, userType) => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        jsBridge.saveToken && jsBridge.saveToken(token);
    } else {
        localStorage.setItem('TOKEN', token);
        localStorage.setItem('USER_TYPE', userType);
    }
};

export const getUserType = () => {
    return localStorage.getItem('USER_TYPE');
};

export const jumpOutUrl = path => {
    window.open(path);
};
