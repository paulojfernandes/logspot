var run = require('tap').test
var arp = require('../')()

run('platform: ' + process.platform, function(test) {
  arp.on('close', function(failed) {
    failed ?
      test.fail('Failed') :
      test.pass('Ran successfully')
    test.end()
  })
})
