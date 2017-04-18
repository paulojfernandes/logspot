# arp-table
arp-table provides basic cross-platform access to system ARP tables by spawning and returning the appropriate process.

[![Build status](https://travis-ci.org/michaelrhodes/arp-table.png?branch=master)](https://travis-ci.org/michaelrhodes/arp-table)

## Install

```
npm install arp-table
```

### Example

``` js
var arp = require('arp-table')()
arp.stdout.pipe(process.stdout)
```

### License
MIT
