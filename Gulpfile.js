"use strict";
var del = require("del");
let gulp = require("gulp");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json", {
  declaration: true
});

let copyData = [
  { src: "./pm2.yml", target: "dist/" },
  { src: "node_modules/**", target: "dist/node_modules" },
  { src: "keys/**/*.pem", target: "dist/keys" }
];

let clean = async () => {
  return await del(["dist/"]);
};

let build = async () => {
  return await gulp
    .src(["src/**/*.ts"])
    .pipe(tsProject())
    .pipe(gulp.dest("dist/"));
};

let copy = async () => {
  return await copyData.forEach(function(data) {
    return gulp.src(data.src).pipe(gulp.dest(data.target));
  });
};

gulp.task("default", function() {
  return (async () => {
    await gulp.series([clean, build, copy])();
  })();
});
