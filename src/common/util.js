export const jsBridge = window.test || {};
export const getToken = () => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        return jsBridge.getToken && jsBridge.getToken();
    } else {
        return localStorage.getItem('TOKEN');
    }
};

export const setToken = token => {
    if (navigator.userAgent.includes('xkysAndroidApp')) {
        jsBridge.saveToken && jsBridge.saveToken(token);
    } else {
        localStorage.setItem('TOKEN', token);
    }
};

export const jumpOutUrl = path => {
    if (path) {
        window.open(path);
    } else {
        return;
    }
};

export const getPId = () => {
    const pid = sessionStorage.getItem('PID');
    if (pid) {
        return pid;
    } else {
        location.href = '/#/login';
        return;
    }
};
