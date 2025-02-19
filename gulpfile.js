const { src, dest, watch, task } = require('gulp');
const { rimraf } = require('rimraf');
const responsive = require('gulp-sharp-responsive');

const responsiveOpts = {
  formats: [
    {
      width: 480,
      rename: {
        suffix: '-480'
      }
    },
    {
      width: 768,
      rename: {
        suffix: '-768'
      }
    },
    {
      width: 1440,
      rename: {
        suffix: '-1440'
      }
    },
    {
      width: 1920,
      rename: {
        suffix: '-1920'
      }
    }
  ],
  includeOriginalFile: true,
  errorOnEnlargement: false,
  withMetadata: false,
  skipOnEnlargement: false,
  withoutEnlargement: true,
  errorOnUnusedConfig: false,
  errorOnUnusedImage: false
};

const resize = (path) => {
  return src(path)
  .pipe(responsive(responsiveOpts))
  .pipe(dest((file) => {
    return file.base + '/resize';
  }));

  return;
  // return src(path)
  //   .pipe(responsive(...responsiveOpts))
  //   .pipe(dest((file) => {
  //     console.log('hello in pipe')
  //     return file.base + '/resize';
  //   }));
}

task('watch', function () {
  const watcher = watch(['src/assets/img/projects/**/*.jpg', '!src/assets/img/projects/**/resize/*.jpg'], (cb) => {
    cb();
  });

  watcher.on('change', function(path, stats) {
    console.log(`File ${path} was changed`);
    resize(path);
  });

  watcher.on('add', function(path, stats) {
    console.log(`File ${path} was added`);
    resize(path);
  });

  watcher.on('unlink', async function(path, stats) {
    console.log(`File ${path} was removed`);
    var filename = path.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
    var path = path.substr(0, path.lastIndexOf('/'));
    console.log(path);
    console.log(filename);

    const deletePattern = path + '/resize/' + filename + '*.jpg';
    const deletedFiles = await rimraf(deletePattern, { glob: true });
    console.log('Files deleted:\n', deletePattern);

    // console.log(path.split('/')[path.length - 1] .split('.')[0]  );
  });

});

task('resize-images', function() {
  return src('src/assets/img/projects/**/*.jpg')
    .pipe(responsive(...responsiveOpts))
    .pipe(dest('dist/assets/img/projects/'))
});

module.exports = {

};
