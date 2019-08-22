import manage from './manage';
import { obj2str } from './helper/utils';
import * as event from './event';


function checkRouteModuleLoaded(url, callback) {
    let routeModule = manage.modules.find(item => url.startsWith(item.path));
    if (!routeModule) {
        return;
    }
    if (manage._modules[routeModule.module_key].loaded) {
        callback();
        return;
    }
    event.once(`module_${routeModule.module_key}_loaded`, () => {
        callback();
    });
    manage.loadModules([routeModule]);
}

export function push(url, params) {
    const paramsString = obj2str(params);
    const urlString = paramsString ? `${url}?${paramsString}` : url;
    checkRouteModuleLoaded(url, () => {
        window.history.pushState(null, '', urlString);
    });
}

export function replace(url, params) {
    const paramsString = obj2str(params);
    const urlString = paramsString ? `${url}?${paramsString}` : url;
    checkRouteModuleLoaded(url, () => {
        window.history.replaceState(null, '', urlString);
    });
}



