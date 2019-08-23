
import * as navigate from './navigate';

let MAP = {};


function getRoute(routeInfo, parentPath) {
    const route = {
        name: routeInfo.name,
        path: [parentPath, routeInfo.path].filter(item => item).join('/')
    };
    if (routeInfo.children) {
        route.children = routeInfo.children.map(item => getRoute(item, route.path));
    }

    return route;
}

function createRouteMap(config) {
    const modules = config.modules.filter(item => item.path !== '*');
    const routeMap = modules.map(item => getRoute(item, ''));
    return routeMap;
}

export function getMap() {
    return MAP;
}

export function init(config) {
    MAP = createRouteMap(config);
}

export function push(url, params) {
    navigate.push(url, params);
}

export function replace(url, params) {
    navigate.push(url, params);
}

