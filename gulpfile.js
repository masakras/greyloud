// Подключаем Gulp
var gulp = require("gulp");

// Подключаем плагины Gulp
var sass = require("gulp-sass"), // переводит SASS в CSS
    cssnano = require("gulp-cssnano"), // Минимизация CSS
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображение
    concat = require("gulp-concat"), // Объединение файлов - конкатенация
    rename = require("gulp-rename"); // Переименование файлов

/* --------------------------------------------------------
   ----------------- Таски ---------------------------
------------------------------------------------------------ */

// Копирование файлов HTML в папку dist
gulp.task("html", function() {
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"));
});

// Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
gulp.task("sass", function() {
    return gulp.src("src/sass/*.sass")
        .pipe(concat('styles.sass'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
         }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"));
});

// Сжимаем картинки
gulp.task('imgs', function() {
    return gulp.src("src/images/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/images"));
});

// Копирование шрифтов в папку dist
gulp.task('fonts', function() {
    return gulp.src("src/fonts/*.+(woff|eot|ttf)")
            .pipe(gulp.dest('dist/fonts/'));
});

// Задача слежения за измененными файлами
gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/sass/*.sass", ["sass"]);
    gulp.watch("src/images/*.+(jpg|jpeg|png|gif)", ["imgs"]);
});

///// Таски ///////////////////////////////////////

// Запуск тасков по умолчанию
gulp.task("default", ["html", "sass", "imgs", "fonts", "watch"]);