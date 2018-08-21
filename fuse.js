const { FuseBox, Sparky, WebIndexPlugin, SVGPlugin, CSSPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    bundleApp() {
        const fuse = FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target: "browser@es5",
            hash: false,
            useTypescriptCompiler: true,
            plugins: [
                CSSPlugin(),
                SVGPlugin(),
                WebIndexPlugin({
                    template: "src/index.html"
                }),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    uglify: false,
                    css: true
                })
            ]
        })
        const app = fuse.bundle("app").shim({
            PropTypes: {
                source: "node_modules/prop-types/index.js"
            }
        });
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">index.tsx");

        return fuse;
    }
    bundleWorker() {
        const fuse = FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target: "browser@es5",
            hash: false,
            useTypescriptCompiler: true,
            plugins: [
                QuantumPlugin({
                    bakeApiIntoBundle: "sw",
                    containedAPI: true,
                    uglify: false,
                    css: true
                })
            ]
        })
        const worker = fuse.bundle("sw")
        if (!this.isProduction) {
            worker.watch()
        }
        worker.instructions(">sw.js")
        return fuse
    }
});

task("clean", () => src("dist").clean("dist").exec())

task("default", ["clean"], async context => {
    const app = context.bundleApp();
    const worker = context.bundleWorker();
    await Promise.all([
        app.dev(),
        app.run(),
        worker.run()
    ])
});

task("dist", ["clean", "worker"], async context => {
    context.isProduction = true;
    const app = context.bundleApp();
    const worker = context.bundleWorker()
    await app.run();
    await worker.run();
});