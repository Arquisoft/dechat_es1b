const gulp = require('gulp')
const exec = require('child_process').exec
const path = require('path')

gulp.task('copyImages', (done) => {
  gulp.src('src/adocs/images/**/*')
    .pipe(gulp.dest('docs/images'))
  gulp.src('src/adocs/diagrams/**/*')
    .pipe(gulp.dest('docs/diagrams'))
  done()
})

gulp.task('adoc2html', function (cb) {
  const command = `${path.resolve('node_modules/.bin/asciidoctorjs')} src/adocs/index.adoc -a toc=left --destination-dir docs`
  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('default',
  gulp.series([
    'copyImages',
    'adoc2html'
  ])
)