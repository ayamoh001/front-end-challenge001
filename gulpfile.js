import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sass = require("gulp-sass")(require("sass"));

import gulp from "gulp";
import pug from "gulp-pug";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-minify";
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import image from "gulp-image";
import gulpImagemin from "gulp-imagemin";
import cssnano from "gulp-cssnano";
import uncss from "gulp-uncss";
import concat from "gulp-concat";
import ftp from 'vinyl-ftp';
import zip from "gulp-zip";

gulp.task("templates", () => {
    return gulp
        .src("stage/html/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("dist/"));
});

gulp.task("css", () => {
    return gulp
        .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(concat("main.css"))
        .pipe(cssnano())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/assets/css"));
});

gulp.task("js", () => {
    return gulp
        .src("stage/js/*.js")
        .pipe(concat("main.js"))
        .pipe(minify())
        .pipe(uglify())
        .pipe(gulp.dest("dist/assets/js/"));
});

gulp.task("img", () => {
    return gulp
        .src("stage/images/**/*")
        .pipe(gulpImagemin())
        .pipe(image())
        .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("zip", () => {
    return gulp.src("dist")
        .pipe(zip("dist.zip"))  
        .pipe(gulp.dest("./"));
});

 
gulp.task("deploy", () => {
    var conn = ftp.create( {
        host:     'ftpupload.net',
        user:     'epiz_32071626',
        password: 'L8LtwdQOFKo',
        parallel: 10,
    } );
    return gulp.src( ['dist/**/*.*'], { base: '.', buffer: false } )
        .pipe( conn.newer( '/htdocs/front-end-mentor/bloger-challenge' ) ) 
        .pipe( conn.dest( '/htdocs/front-end-mentor/bloger-challenge' ) );
 
} );

gulp.task("watch", () => {
    gulp.watch("stage/html/**/*.pug", gulp.series("templates"));
    gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"],gulp.series("css"));
    gulp.watch("stage/js/**/*.js", gulp.series("js"));
    // gulp.watch("stage/images/**/*.*", gulp.series("img"));
    // gulp.watch("stage/**/*.*", gulp.series("deploy"));
});

gulp.task('default', gulp.series('watch'));