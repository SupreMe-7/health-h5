export const jsBridge = window.test || {};
export const getToken = () => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        return jsBridge.getToken && jsBridge.getToken();
    } else {
        return sessionStorage.getItem('TOKEN');
    }
};

export const setToken = token => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        jsBridge.saveToken && jsBridge.saveToken(token);
    } else {
        sessionStorage.setItem('TOKEN', token);
    }
};

export const jumpOutUrl = path => {
    window.open(path);
};
