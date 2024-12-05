import Cookies from 'js-cookie';

// todo: clear the local storage before loggout

export function initLogout() {
    localStorage.removeItem('articleDataList');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/';
}