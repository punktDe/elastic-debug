const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');

const filesAndDirectories = {
    elasticsearchDebugView: {
        libraries: [
        ],
        source: [
            'JavaScript/ElasticsearchDebugView.js'
        ],
        destination: {
            path: '../Public/JavaScript/',
            fileName: 'ElasticsearchDebugView.min.js'
        },
    },

    styles: {
        source: [
            'Styles/**/*.scss'
        ],
        destination: '../Public/Styles',
    },
};

const javascript = (subTaskName) => {
    return gulp
        .src([].concat(filesAndDirectories[subTaskName].libraries, filesAndDirectories[subTaskName].source))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat(filesAndDirectories[subTaskName].destination.fileName))
        .pipe(gulp.dest(filesAndDirectories[subTaskName].destination.path))
};

const elasticsearchDebugView = () => {
    return javascript('elasticsearchDebugView')
};


const styles = () => {
    return gulp
        .src(filesAndDirectories.styles.source)
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(gulp.dest(filesAndDirectories.styles.destination));
};

const registerWatchers = () => {
    gulp.watch(filesAndDirectories.elasticsearchDebugView.source, elasticsearchDebugView);
    gulp.watch(filesAndDirectories.styles.source, sass);
};

const allJavascript = gulp.parallel(elasticsearchDebugView);

const buildAll = gulp.parallel(allJavascript, styles);

exports.elasticsearchDebugView = elasticsearchDebugView;
exports.allJavascript = allJavascript;
exports.styles = styles;
exports.watch = gulp.series(buildAll, registerWatchers);
exports.default = buildAll;

