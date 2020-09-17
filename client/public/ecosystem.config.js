module.exports = {
    name : "client",
    script : "serve",
    exec_mode : "cluster",
    instances : 1,
    env : {
        PM2_SERVE_PATH : "./",
        PM2_SERVE_PORT : 80,
        PM2_SERVE_SAP : "true",
        PM2_SERVE_HOMEPAGE : "/index.html",
    }
}
