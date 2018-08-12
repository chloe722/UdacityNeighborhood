const { FuseBox, Sparky, WebIndexPlugin, SVGPlugin, CSSPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target: "browser@es5",
            hash: this.isProduction,
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
    }
    bundleWorker() {
        const fuse = FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target: "browser@es5",
            hash: false,
            useTypescriptCompiler: true
        })
        const worker = fuse.bundle("worker")
        worker.instructions(">worker.ts")
        return fuse
    }
    createBundle(fuse) {
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

        return app;
    }
});

task("clean", () => src("dist").clean("dist").exec())

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    fuse.dev();
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean", "worker"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    context.createBundle(fuse);
    await fuse.run();
});

task("worker", ["clean"], async context => {
    const fuse = context.bundleWorker()
    await fuse.run()
})