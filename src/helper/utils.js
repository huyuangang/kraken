



function is(type, target) {
    return Object.prototype.toString.apply(target) === `[object ${type}]`;
}

export function isArray(target) {
    return is('Array', target);
}

export function isObject(target) {
    return is('Object', target);
}

export function isFunction(target) {
    return is('Function', target);
}

export function createContainer(id) {
    if (!id) {
        return;
    }
    let dom = document.getElementById(id);
    if (dom) {
        return;
    }
    dom = document.createElement('div');
    dom.id = id;
    document.body.appendChild(dom);
}


export function obj2str(obj) {
    return isObject(obj) ? Object.keys(obj).map(item => `${item}=${obj[item]}`).join('&') : '';
}
