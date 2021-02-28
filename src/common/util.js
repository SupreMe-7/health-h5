export const getToken = () => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        if (window.getToken) {
            console.log('我在window上有getToken');
        }
        return window.getToken && window.getToken();
    } else {
        return sessionStorage.getItem('TOKEN');
    }
};

export const setToken = token => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        if (window.saveToken) {
            console.log('我有window.saveToken()');
        }
        window.saveToken && window.saveToken(token);
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
