

export default class Sandbox {
    constructor(config) {
        this.module_id = config.module_id;
        this.windowSandbox = new WindowSandbox();
        this.styleSandbox = new StyleSandbox();
    }

    beforeMount() {
        this.windowSandbox.beforeMount();
        this.styleSandbox.beforeMount();
    }

    mounted() {

    }

    beforeUnMount() {
        this.windowSandbox.beforeUnMount();
        this.styleSandbox.beforeUnMount();
    }

}

class WindowSandbox {
    constructor() {
        this.orignalData = {};
        this.moduleData = {};
    }

    beforeMount() {
        const { moduleData, orignalData } = this;
        Object.keys(window).forEach(item => {
            orignalData[item] = window[item];
        });
        // 重置上次加载的数据
        Object.keys(moduleData).forEach(item => {
            window[item] = moduleData[item];
        });
    }

    mounted() {

    }

    beforeUnMount() {
        Object.keys(window).forEach(item => {
            if (this.orignalData[item]) {
                window[item] = this.orignalData[item];
            } else {
                this.moduleData[item] = window[item];
                delete window[item];
            }
        });
    }
}

class StyleSandbox {
    constructor() {
        // 模块加载前的style
        this.orignalStyle = [];
        // 模块加载之后的style和originStyle的diff结果
        this.cacheModuleStyle = [];
        this.createFragment();
    }

    createFragment() {
        this.fragment = document.createFragment();
    }
    
    //  模块加载之前
    beforeMount() {
        this.orignalStyle = document.querySelectorAll('head style');
        document.head.appendChild(this.fragment);
        // 重置fragment
        this.createFragment();
    }

    mounted() {
    }

    beforeUnMount() {
        this.cacheModuleStyle = Array.prototype.slice.call(document.querySelectorAll('head style'), (this.orignalStyle.length));
        this.cacheModuleStyle.map(item => {
            this.fragment.appendChild(item);
            // 移除模块的style
            document.head.removeChild(item);
        });
    }
}


// export default Sandbox;