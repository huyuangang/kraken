
import Sandbox from './sandbox';
import { get as getSource } from './fetch';
import manage from './manage';
import * as event from './event';
import { createContainer } from './helper/utils';

class Module {
    constructor(config) {
        this.config = config;
        this.key = config.module_key;
        this.dependecies = this.config.dependecies;
        this.current = false;
        this.loaded = false;
        this.render = null;
        this.exports = {};
        this.sandbox = new Sandbox(config);
        // 创建沙箱
        this.beforeMount();
        // 加载代码
        this.loadModule();
    }
    async loadModule() {
        const { source, container } = this.config;
        const { loaded, render } = this;
        if (loaded) {
            return;
        }
        if (!render) {
            const jsbundle = await getSource(source);
            this.render = new Function('require', 'exports', 'module', jsbundle);
        }
        // 判断依赖模块是否加载完成
        const dependeciesLoaded = this.checkDependencesLoaded();
        if (!dependeciesLoaded) {
            return;
        }
        createContainer(container);
        this.render.call(this.exports, manage._require, this.exports, this);
        this.loaded = true;
        event.emit(`module_${this.key}_loaded`);
    }

    checkDependencesLoaded() {
        const { dependecies } = this;
        if (!dependecies) {
            return true;
        }
        const unloadDependencies = manage.config.modules.filter(item =>
            !(manage._modules[item.module_key]
            && manage._modules[item.module_key].loaded)
            && dependecies.indexOf(item.module_key) > -1);

        if (!unloadDependencies.length) {
            return true;
        }
        unloadDependencies.forEach(item => {
            event.once(`module_${item.module_key}_loaded`, () => {
                this.loadModule();
            });
        });
        manage.loadDependecies(unloadDependencies);
        return false;
    }

    beforeMount() {
        this.sandbox.beforeMount();
    }

    mounted() {
    }
    
    beforeUnMount() {
        this.sandbox.beforeUnMount();
    }
}

export default Module;