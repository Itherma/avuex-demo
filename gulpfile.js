const gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");

// 处理样式的配置
gulp.task("compile", function() {
  return gulp
    .src("./avuex/styles/index.scss")
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: ["ie > 9", "last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest("./avuex/css/"));
});

// 打包文件
gulp.task("build", gulp.series(["compile"]));

// 监听文件变化
gulp.task("watch", async function() {
  gulp.watch(["./avuex/styles/**"], gulp.series(["compile"]));
});
