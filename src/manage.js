import Module from './module';

class Manage {
    constructor() {
        this._modules = {};
        this._require = () => null;
    }
    
    run(config) {
        this.config = config;
        this.loadDefaultModule();
        this.loadCurrentModule();
    }

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
}

export default new Manage();