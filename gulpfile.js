var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var path         = require('path');
var runSequence  = require('run-sequence');
var autoprefixer = require('autoprefixer');

var paths = {
	src: {
		base: './src/',
		scripts: ['./src/javascript/*.js', './src/javascript/vendor/*.js'],
		styles: {
			scss: './src/stylesheets/scss/',
			css: './src/stylesheets/css/'
		},
		pug: './src/pug/'
	},
	assets: {
		images: './assets/images/**/*',
		json: './assets/json/',
		scripts: './assets/javascript/',
		styles: './assets/stylesheets/',
	},
	dist: {
		base: './dist/',
		html: './src/tmp/',
		scripts: './dist/scripts/',
		styles: './dist/stylesheets/',
		assets: './dist/assets/'
	}
}

gulp.task('default', ['watch', 'server']);

gulp.task('build', function(callback) {
	runSequence(['styles', 'scripts'], 'pug', callback);
});

gulp.task('watch', function() {
	gulp.watch(path.join(paths.src.styles.scss, "**/*.scss"), ['styles']);
	gulp.watch(paths.src.scripts, ['scripts']);
	gulp.watch(path.join(paths.src.pug, "**/*.pug"), ['pug']);
	gulp.watch(path.join(paths.assets.json, "*.json"), ['json'])
});

gulp.task('clean', function() {
	gulp.src(path.join(paths.dist.base, "**/*"), { read: false })
		.pipe($.clean());
});

// gulp.task('clean-html', function() {
// 	gulp.src([path.join(paths.dist.html, '/*.html'), path.join(paths.dist.base, "/index.html")], {read: false})
// 		.pipe($.clean());
// });

gulp.task('clean-js', function() {
	gulp.src(path.join(paths.dist.scripts, '*'), { read: false })
		.pipe($.clean());
});

gulp.task('clean-css', function() {
	gulp.src(path.join(paths.dist.styles, '*'), { read: false })
		.pipe($.clean());
});

gulp.task('scss', function() {
	gulp.src(path.join(paths.src.styles.scss, "style.scss"))
		// .pipe($.debug({title: 'scss:', minimal: false}))
		.pipe($.plumber())
		.pipe($.sass())
		.pipe($.postcss([ autoprefixer() ]))
		// .pipe($.concat({path: 'style.css', cwd: ''}))
		.pipe(gulp.dest(paths.src.styles.css));
});

gulp.task('minify-css', function() {
	setTimeout(function() {
		gulp.src([
				path.join(paths.src.styles.css, '*.css'),
				path.join('!' + paths.src.styles.css, '*.min.css'),
			])
			.pipe($.plumber())
			// .pipe($.sourcemaps.init())
			.pipe($.cleanCss({
				keepBreaks: true,
			}))
			.pipe($.rename(function(path) {
				path.basename += ".min";
				path.extname = ".css";
			}))
			.pipe($.concat({ path: 'app.min.css', cwd: '' }))
			// .pipe($.sourcemaps.write("./"))
			.pipe(gulp.dest(paths.dist.styles))
			.pipe($.notify("CSS is ready..."));
	}, 500);
});

gulp.task('styles', function(callback) {
	runSequence('scss', 'minify-css', callback);
});

gulp.task('scripts', function() {
	gulp.src(paths.src.scripts)
		.pipe($.plumber())
		// .pipe($.sourcemaps.init())
		.pipe($.uglify())
		.pipe($.concat({ path: 'app.min.js', cwd: '' }))
		// .pipe($.sourcemaps.write("./"))
		// .pipe($.debug({title: 'Scripts:', minimal: false}))
		.pipe(gulp.dest(paths.dist.scripts))
		.pipe($.notify("JS is ready..."));
});

gulp.task('js', function() {
	gulp.src(path.join(paths.assets.scripts, '*.js'))
		.pipe($.plumber())
		.pipe($.uglify())
		// .pipe($.sourcemaps.init())
		.pipe($.concat({ path: 'vendor.min.js', cwd: '' }))
		// .pipe($.sourcemaps.write("./"))
		.pipe(gulp.dest(paths.dist.scripts))
});

gulp.task('css', function() {
	gulp.src(path.join(paths.assets.styles, '*.min.css'))
		.pipe($.plumber())
		// .pipe($.sourcemaps.init())
		.pipe($.concat({ path: 'vendor.min.css', cwd: '' }))
		.pipe(gulp.dest(paths.dist.styles))
		// .pipe($.sourcemaps.write("./"))
		// .pipe($.debug({title: 'Styles:', minimal: false}))
		.pipe(gulp.dest(paths.dist.styles))
});

gulp.task('images', function() {
	gulp.src(paths.assets.images)
		.pipe($.imagemin({ optimizationLevel: 5 }))
		.pipe(gulp.dest(path.join(paths.dist.assets, "images")));
});

gulp.task('json', function() {
	gulp.src(path.join(paths.assets.json, "*.json"))
		.pipe(gulp.dest(path.join(paths.dist.assets, "json")));
});

gulp.task('assets', ['images', 'json', 'css', 'js'], function() {
	gulp.src([], { read: false })
		.pipe($.notify("Assets are ready..."));
});

gulp.task('pug', function() {
	gulp.src(path.join(paths.src.pug, "views/*.pug"))
		.pipe($.pug())
		.pipe(gulp.dest('./dist'))
		.pipe($.notify("Index is ready..."));
});

gulp.task('server', function() {
	var port = 8080;
	gulp.src(paths.dist.base)
		.pipe($.webserver({
			port: port,
			livereload: true
		}));
});