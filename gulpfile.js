const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

// Task to copy HTML files
gulp.task('copyHTML', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

// Task to optimize and copy images
gulp.task('optimizeImages', function() {
  return gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Task to concatenate and minify CSS files
gulp.task('minifyCSS', function() {
  return gulp.src('css/**/*.css')
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// Task to concatenate and minify JS files
gulp.task('minifyJS', function() {
  return gulp.src('js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Default task that runs all other tasks
gulp.task('default', gulp.series('copyHTML', 'optimizeImages', 'minifyCSS', 'minifyJS'));

// Watch task to automatically run tasks on file changes
gulp.task('watch', function() {
  gulp.watch('index.html', gulp.series('copyHTML'));
  gulp.watch('img/**/*', gulp.series('optimizeImages'));
  gulp.watch('css/**/*.css', gulp.series('minifyCSS'));
  gulp.watch('js/**/*.js', gulp.series('minifyJS'));
});