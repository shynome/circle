//static server
const express = require('express')
express()
.use(express.static(__dirname))
.listen(3000)