(function () {
  'use strict';

  // Bibliotecas iniciais a serem importadas
  var fs             = require('fs'),
    gulp             = require('gulp'),
    del              = require('del'),
    dependencies     = require('main-bower-files'),
    stylish          = require('jshint-stylish'),
    plugin           = require('gulp-load-plugins')({
      lazy: true,
      camelize: true
    }),
    directory        = require('./gulp/directory'),
    processable      = require('./gulp/processable');

  /*
   * Definição das tarefas que serão executadas
   */

  gulp.task('default', ['lint', 'build', 'serve', 'watch']);
  gulp.task('prebuild', [
    'prebuild:cleanup',
    'prebuild:bower'
  ]);
  gulp.task('build', [
    'build:vendor',
    'build:application'
  ]);
  gulp.task('build:vendor', [
    'build:vendor:javascript',
    'build:vendor:stylesheet',
    'build:vendor:fonts'
  ]);-
  gulp.task('build:application', [
    'build:application:javascript',
    'build:application:stylesheet',
    'build:application:page',
    'build:application:image',
    'build:application:internacionalization',
  ]);
  gulp.task('lint', [
    'lint:javascript',
    'lint:stylesheet',
    'lint:page',
  ]);
  gulp.task('serve', [
    'serve:application'
  ]);
  gulp.task('watch', [
    'watch:vendor',
    'watch:application:javascript',
    'watch:application:stylesheet',
    'watch:application:page',
    'watch:application:image',
    'watch:application:internacionalization'
  ]);

  /*
   * Implementação das tarefas a serem executadas
   */

  gulp.task('prebuild:cleanup', () => {
    return del([
      directory.target.root
    ], { force: true });
  })

  // Baixa as dependências definidas no arquivo bower.json
  gulp.task('prebuild:bower', ['prebuild:cleanup'], () => {
    try {
      var stats = fs.statSync('./bower');
      return plugin.bower({ cmd : 'install'});
    } catch (e) {
      return plugin.bower({ cmd : 'update'});
    }
  });


  // Captura os arquivos principais do pacote baixado pelo bower e gera um
  // arquivo minimificado
  gulp.task('build:vendor:javascript', ['prebuild'], () => {
    let files = dependencies({filter : '**/*.js'});
    return gulp.src(files)
      .pipe(plugin.concat('vendor.min.js'))
      .pipe(plugin.uglify())
      .pipe(gulp.dest(directory.target.javascript));
  });

  gulp.task('build:vendor:stylesheet', ['prebuild'], () => {
    return gulp.src(dependencies({filter : '**/*.css'}))
    .pipe(plugin.concat('vendor.min.css'))
    .pipe(plugin.uglifycss({
      'maxLineLen': 80,
      'uglyComments': true
    }))
    .pipe(gulp.dest(directory.target.stylesheet));
  });

  gulp.task('build:vendor:fonts', ['prebuild'], () => {
    var files = dependencies({
      filter : '**/*.(eot|woff2?|ttf|svg)'
    });

    return gulp.src(files)
      .pipe(gulp.dest(directory.target.assets + 'fonts'));
  });

  var buildApplicationJavascript = () => {
    return gulp.src(processable.javascript)
      .pipe(plugin.concat('application.min.js'))
      .pipe(plugin.ngAnnotate({
        single_quotes : true
      }))
      .pipe(plugin.uglify())
      .pipe(gulp.dest(directory.target.javascript));
  }
  gulp.task('build:application:javascript', ['prebuild'], buildApplicationJavascript);

  var buildApplicationStylesheet = () => {
    console.log(processable.stylesheet);
    return gulp.src(processable.stylesheet)
      .pipe(plugin.less())
      .pipe(plugin.concat('application.min.css'))
      .pipe(plugin.uglifycss({
        'maxLineLen': 80,
        'uglyComments': true
      }))
      .pipe(gulp.dest(directory.target.stylesheet));
  };
  gulp.task('build:application:stylesheet', ['prebuild'], buildApplicationStylesheet);

  var buildApplicationPage = () => {
    return gulp.src(processable.page)
      .pipe(plugin.pug())
      .pipe(gulp.dest(directory.target.root));
  };
  gulp.task('build:application:page', ['prebuild'], buildApplicationPage);

  var buildApplicationImage = () => {
    return gulp.src(processable.image)
      .pipe(plugin.image())
      .pipe(gulp.dest(directory.target.image));
  };
  gulp.task('build:application:image', ['prebuild'], buildApplicationImage);

  var buildApplicationInternacionalization = () => {
    return gulp.src(processable.internacionalization)
      .pipe(plugin.jsonminify())
      .pipe(gulp.dest(directory.target.root + 'data'));
  };
  gulp.task('build:application:internacionalization', buildApplicationInternacionalization);

  gulp.task('serve:application', ['build'], () => {
    gulp.src(directory.target.root)
      .pipe(plugin.webserver({
        livereload: true,
        open: true
      }));
  });

  /**
   * Linters
   */

  // Lista os problemas de codestyle identificados.
  gulp.task('lint:javascript', () => {
    return gulp.src(processable.javascript)
      .pipe(plugin.jshint())
      .pipe(plugin.jshint.reporter(stylish));
  });

  gulp.task('lint:stylesheet', () => {
    return gulp.src(processable.stylesheet)
      .pipe(plugin.lesshint())
      .pipe(plugin.lesshint.reporter())
      .pipe(plugin.lesshint.failOnError());
  });

  gulp.task('lint:page', () => {
    return gulp.src(processable.page)
      .pipe(plugin.pugLinter())
      .pipe(plugin.pugLinter.reporter('fail'))
  });

  /**
   * Whatchers
   */

  gulp.task('watch:vendor', ['serve'], () => {
    return gulp.watch('bower.json', ['vendor'])
      .on('change', (file) => {
        console.log('Idenficada mudança no arquivo de dependências! Executando vendor');
      });
  });

  gulp.task('watch:application:javascript', ['serve'], () => {
    return gulp.watch(processable.javascript, buildApplicationJavascript)
      .on('change', (file) => {
        console.log('O arquivo ' + file + ' foi modificado! Executando build:application:javascript\n');
        console.log(file);
      });
  });

  gulp.task('watch:application:stylesheet', ['serve'], () => {
    return gulp.watch(processable.stylesheet, buildApplicationStylesheet)
      .on('change', (file) => {
        console.log('O arquivo ' + file + ' foi modificado! Executando build:application:stylesheet\n');
      });
  });

  gulp.task('watch:application:page', ['serve'], () => {
    return gulp.watch(processable.page, buildApplicationPage)
      .on('change', (file) => {
        console.log('O arquivo ' + file + ' foi modificado! Executando build:application:page\n');
      });
  });

  gulp.task('watch:application:image', ['serve'], () => {
    return gulp.watch(processable.image, buildApplicationImage)
      .on('change', (file) => {
        console.log('O arquivo ' + file + ' foi modificado! Executando build:application:image\n');
      });
  });

  gulp.task('watch:application:internacionalization', ['serve'], () => {
    return gulp.watch(processable.internacionalization, buildApplicationInternacionalization)
      .on('change', (file) => {
        console.log('O arquivo ' + file + ' foi modificado! Executando build:application:internacionalization\n');
      });
  });

}());
