
import * as utils from './helper/utils';

const EVENT_MAP = {};
/**
 *
 * @param {String} key
 * @param {Function} handler
 */
export function on(key, handler) {
    if (!utils.isFunction(handler)) {
        return;
    }
    if (!EVENT_MAP[key]) {
        EVENT_MAP[key] = {
            cache: false,
            handlers: []
        };
    }
    let currentEvent = EVENT_MAP[key];
    currentEvent.cache ? handler(currentEvent.payload) : currentEvent.handlers.push(handler);
}

/**
 *
 * @param {String} key
 * @param {*} payload
 * @param {Boolean} cache 事件是否缓存
 */
export function emit(key, payload, cache = false) {
    if (!EVENT_MAP[key]) {
        EVENT_MAP[key] = {
            cache,
            payload,
            handlers: []
        };
    }
    if (payload !== undefined) {
        EVENT_MAP[key].payload = payload;
    }
    if (typeof cache === 'boolean') {
        EVENT_MAP[key].cache = cache;
    }

    EVENT_MAP[key].handlers.map(item => item(payload));
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

