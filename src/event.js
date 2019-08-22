
import * as utils from './helper/utils';

const EVENT_MAP = {

};

/**
 *
 * @param {String} key
 * @param {Function} handler
 */
export function on(key, handler) {
    if (!utils.isFunction(handler)) {
        return;
    }
    utils.isArray(EVENT_MAP[key]) ? EVENT_MAP[key].push(handler) : EVENT_MAP[key] = [handler];
}

/**
 *
 * @param {String} key
 * @param {*} payload
 */
export function emit(key, payload) {
    if (!utils.isArray(EVENT_MAP[key])) {
        return;
    }
    EVENT_MAP[key].map(item => item(payload));
}

/**
 *
 * @param {String} key
 * @param {Function} handler
 */
export function off(key, handler) {
    if (!utils.isArray(EVENT_MAP[key])) {
        return;
    }
    EVENT_MAP[key] = EVENT_MAP[key].filter(item => item !== handler);
}

/**
 *
 * @param {String} key
 * @param {Function} handler
 */
export function once(key, handler) {
    function onceHandler(payload) {
        handler(payload);
        off(key, onceHandler);
    }
    on(key, onceHandler);
}

