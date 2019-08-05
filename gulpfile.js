const {
  src,
  dest,
  task,
  series,
  watch,
  parallel
} = require('gulp'),
  rm = require('gulp-rm'),
  sass = require('gulp-sass'), // компиляция cscc в css
  concat = require('gulp-concat'), // конкатенация
  browserSync = require('browser-sync').create(), //синхронизация страницы
  reload = browserSync.reload, //автоматическое обновление страницы от изменений в проекте
  sassGlob = require('gulp-sass-glob'), // импорт всех scss файлов в один main.scss
  autoprefixer = require('gulp-autoprefixer'), // автопрефиксер
  cleanCSS = require('gulp-clean-css'), // минификация css кода
  sourcemaps = require('gulp-sourcemaps'), // добавление путей
  babel = require('gulp-babel'), // компилятор js кода для устаревших браузеров
  uglify = require('gulp-uglify'), // минификация js кода
  svgo = require('gulp-svgo'), // оптимизация svg картинок (Например, удаление ненужных аттрибутов)
  svgSprite = require('gulp-svg-sprite'), // создание Sprite для svg
  pug = require('gulp-pug'), // компиляция pug в html
  gulpif = require('gulp-if'), // добавление условий в gulp для разделения проекта
  env = process.env.NODE_ENV; // добавление переменных в package.json в "scripts" для разделения проекта
sass.compiler = require('node-sass');
const {
  DIST_PATH, // добавление путей и библиотек в gulp
  SRC_PATH,
  STYLES_LIBS,
  SCRIPT_LIBS
} = require('./gulp.config');

// CLEAN DIST FOLDER

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, {
    read: false
  }).pipe(rm());
});

//HTML ADD

task('html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({
      stream: true
    }));
});

// PUG ADD

task('pug-main', () => {
  return src(`${SRC_PATH}/pug/pages/index.pug`)
    .pipe(pug({
      pretty: true,
    }))
    .pipe(dest(DIST_PATH))
    .pipe(reload({
      stream: true
    }));
});

task('pug-pages', () => {
  return src([
      `${SRC_PATH}/pug/pages/*.pug`,
      `!${SRC_PATH}/pug/pages/index.pug`
    ])
    .pipe(pug({
      pretty: true,
    }))
    .pipe(dest(`${DIST_PATH}/assets/pages/`))
    .pipe(reload({
      stream: true
    }));
});

//FONTS ADD

task('fonts', () => {
  return src(`${SRC_PATH}/fonts/**/*`)
    .pipe(dest(`${DIST_PATH}/assets/fonts`));
});

// IMAGES ADD

task('images', () => {
  return src(`${SRC_PATH}/img/**/*`)
    .pipe(dest(`${DIST_PATH}/assets/img/`));
});

//CSS ADD

task('styles', () => {
  return src([...STYLES_LIBS,
      `${SRC_PATH}/styles/*.scss`,
      `${SRC_PATH}/styles/**/*.scss`
    ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'dev', autoprefixer({
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/assets/`))
    .pipe(reload({
      stream: true
    }));
});

// SCRIPTS ADD

task('scripts', () => {
  return src([...SCRIPT_LIBS, `${SRC_PATH}/scripts/**/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {
      newLine: ';'
    }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/assets/`))
    .pipe(reload({
      stream: true
    }));
});

// CREATE SVG SPRITE

task('icons', () => {
  return src(`${SRC_PATH}/img/**/*.svg`)
    .pipe(svgo({
      plugins: [{
        removeAttrs: {
          attrs: ['fill', 'stroke', 'style']
        }
      }]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/assets/img/icons/`))
});

// START SERVER

task('server', () => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  });
});

// TURN ON WATCHERS

task('watch', () => {
  watch(`./${SRC_PATH}/styles/**/*.scss`, series('styles'));
  watch(`./${SRC_PATH}/*.html`, series('html'));
  watch(`./${SRC_PATH}/pug/**/*.pug`, series('pug-pages'));
  watch(`./${SRC_PATH}/pug/pages/index.pug`, series('pug-main'));
  watch(`./${SRC_PATH}/scripts/*.js`, series('scripts'));
  watch(`./${SRC_PATH}/img/icons/*.svg`, series('icons'));
});

// DEV

task(
  'default',
  series('clean',
    parallel('html',
      // 'pug-pages', 'pug-main',
      'fonts', 'images', 'styles', 'scripts', 'icons'),
    parallel('watch', 'server')
  )
);

// BUILD

task(
  'build',
  series('clean',
    parallel('html',
      // 'pug-main', 'pug-pages', 
      'fonts', 'images', 'styles', 'scripts', 'icons')
  )
);