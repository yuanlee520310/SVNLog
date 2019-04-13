// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const os = require('os')
window.onload = function(){
    const $log = document.getElementById('log')
    const $content = document.getElementById('content')
    const $clear = document.getElementById('clear')
    document.getElementById('btn').onclick = function () {
        const list = []
        const value = $log.value
        const arr = value.split(/[\n\r]\s*[\n\r]/)
        const revisions = []
        for(let i = 0; i < arr.length; i++){
            const log = parseLog(arr[i])
            console.warn('log:\n', log)
            revisions.push(log.revision)
            list.push(log.data)
        }
        const time = new Date()
        const timeStr = [time.getFullYear(),time.getMonth()+1,time.getDate()].join(':') + ' ' + [time.getHours(),time.getDate(),time.getMinutes()].join(':') + ' 更新：' + os.EOL
        const head = [timeStr,'内容：' + $content.value].join(os.EOL)
        const revision = 'Revision:' + revisions.shift() + ' - ' + revisions.pop()
        $clear.value = head + os.EOL + os.EOL + revision + os.EOL + os.EOL + '明细：' + os.EOL + os.EOL +  list.join('----'+os.EOL)
    }
}


function parseLog(log) {
    let revision = log.match(/Revision:(.+)[\n\r]/) || []
    let message = log.match(/Message:[\s\S]*(?=\-{4})/m) || []
    return {
        revision: revision[1].replace(/\s+/g,''),
        data:[revision.join('').replace(/\s+/g,''), message.join('')].join(os.EOL)
    }
}
