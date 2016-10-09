// Include gulp
var gulp = require('gulp');


// Include plugins
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


//  Rather than have to specify each plugin, gulp-load-plugins will search your
//  packages.json file and automatically include them as plugins.pluginName().

var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});


/*  Include plugins in gulp-load-plugins way 

    var plugins.rename = require('gulp-rename');
    var plugins.imagemin = require('gulp-imagemin');
    var plugins.cache = require('gulp-cache');
*/

// Default Task
gulp.task('default', ['scripts', 'images', 'watch']);


//
//gulp.task('patch', function() {
//    console.log("Into task patch");
//    gulp.src('client/templates/*.jade')
//      .pipe(jade())
//      .pipe(minify())
//      .pipe(gulp.dest('build/minified_templates'));
//});
//

// Concatenate and minify js files

gulp.task('scripts', function(){
    return gulp.src('src/js/*.js')      // pick up all the js files from this location
        .pipe(concat('main.js'))        // concatenate the above picked js files to a main.js file
        .pipe(plugins.rename({suffix: '.min'})) // renames the file main.min.js using the gulp-rename plugin
        .pipe(uglify())                 // minifies using uglify
        .pipe(gulp.dest('build/js'))    // store that main.js file in build/js directory
});

// Image optimization with gulp
//  gulp-cache ensure only new or changed images get compressed.

gulp.task('images', function(){
   return gulp.src('src/images/**/*') 
    .pipe(plugins.cache(plugins.imagemin({optimizationLevel : 5, progressive : true, interlaced : true})))
    .pipe(gulp.dest('build/img'));
});



gulp.task('watch', function(){
    // Watch js files
    gulp.watch('src/js/*.js', ['scripts'])
    // Watch image files
    gulp.watch('src/images/**/*', ['images'])
});