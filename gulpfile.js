const gulp = require('gulp')
const puml = require('gulp-puml')
const svg2png = require('gulp-svg2png')
const exec = require('child_process').exec
const path = require('path')

gulp.task('puml', () => {
  return gulp.src('src/adocs/puml/*.puml')
    .pipe(puml())
    .pipe(gulp.dest('src/adocs/puml'))
})

gulp.task('svg2png', (done) => {
  gulp.src('src/adocs/puml/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('docs/docs/diagrams'))
  done()
})

gulp.task('copyImages', (done) => {
  gulp.src('src/adocs/images/**/*')
    .pipe(gulp.dest('docs/docs/images'))
  gulp.src('src/adocs/diagrams/**/*')
    .pipe(gulp.dest('docs/docs/diagrams'))
  done()
})

gulp.task('adoc2html', function (cb) {
  const command = `${path.resolve('node_modules/.bin/asciidoctorjs')} src/adocs/index.adoc -a toc=left --destination-dir docs/docs`
  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('default',
  gulp.series([
    'puml',
    'svg2png',
    'copyImages',
    'adoc2html'
  ])
)