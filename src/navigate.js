import manage from './manage';
import { obj2str, isFunction } from './helper/utils';
import * as event from './event';

/**
 *
 * @param {String} url 跳转链接
 * @param {Function} callback 模块加载回调函数
 */
function checkRouteModuleLoaded(url, callback) {
    let routeModule = manage.modules.find(item => url.startsWith(item.path));
    if (!routeModule) {
        return;
    }
    if (manage._modules[routeModule.module_key].loaded) {
        isFunction(callback) && callback();
        return;
    }
    event.once(`module_${routeModule.module_key}_loaded`, () => {
        isFunction(callback) && callback();
    });
    manage.loadModules([routeModule]);
}

/**
 *
 * @param {String} url 跳转链接
 * @param {Object} params 携带参数
 */
export function push(url, params) {
    const paramsString = obj2str(params);
    const urlString = paramsString ? `${url}?${paramsString}` : url;
    checkRouteModuleLoaded(url, () => {
        window.history.pushState(null, '', urlString);
    });
}

/**
 *
 * @param {String} url 跳转链接
 * @param {Object} params 携带参数
 */
export function replace(url, params) {
    const paramsString = obj2str(params);
    const urlString = paramsString ? `${url}?${paramsString}` : url;
    checkRouteModuleLoaded(url, () => {
        window.history.replaceState(null, '', urlString);
    });
}





