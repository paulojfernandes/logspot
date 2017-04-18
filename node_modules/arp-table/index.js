var spawn = require('child_process').spawn 

module.exports = function() {
  return /linux/.test(process.platform) ?
    spawn('cat', ['/proc/net/arp']):
    spawn('arp', ['-a'])
}
