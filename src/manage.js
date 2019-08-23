import Module from './module';
import { isObject } from './helper/utils';
import { init as routerInit } from './router.js';

class Manage {
    constructor() {
        this._modules = {};
        this._externals = {};
        this._require = name => this._externals[name];
    }
    run(config) {
        this.config = config;
        routerInit(config);
        this.loadDefaultModule();
        this.loadCurrentModule();
    }
    /**
     *
     * @param {Array<module>} modules 需要加载的模块
     */
    loadModules(modules) {
        modules.forEach(item => this._modules[item.module_key] = new Module(item));
    }
    
    loadDefaultModule() {
        const { modules } = this.config;
        this.loadModules(modules.filter(item => item.path === '*'));
    }

    loadCurrentModule() {
        const { modules } = this.config;
        const currentPath = location.pathname;
        this.loadModules(modules.filter(item => currentPath.startsWith(item.path)));
    }
    /**
     *
     * @param {Object} obj 外部扩展对象
     */
    setExternals(obj) {
        if (!isObject(obj)) {
            return;
        }
        Object.keys(obj).map(item => {
            this._externals[item] = obj[item];
        });
    }
}

export default new Manage();