const test = require('brittle')
const { ProcessInfo } = require('.')

test('the system uptime counts up from boot', (t) => {
  const info = ProcessInfo.processInfo

  t.is(ProcessInfo.processInfo, info, 'one wrapper for the process')

  const first = info.systemUptime

  t.ok(first > 0)
  t.ok(info.systemUptime >= first)
})
