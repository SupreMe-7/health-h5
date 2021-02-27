export const getToken = () => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        console.log('我有xkysAndroidApp getToken');
        window.getToken && window.getToken();
        console.log('我有window.getToken()', window.getToken());
    } else {
        return sessionStorage.getItem('TOKEN');
    }
};

export const setToken = token => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        console.log('我有xkysAndroidApp setToken');
        window.saveToken && window.saveToken(token);
        console.log('我有window.saveToken();', window.saveToken());
    } else {
        sessionStorage.setItem('TOKEN', token);
    }
};

export const jumpOutUrl = path => {
    if (window.getNewWebView) {
        console.log('我有window.getNewWebView');
        window.getNewWebView(path);
    } else {
        window.open(path);
    }
};
