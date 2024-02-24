const express = require('express')
const userRouter = require('./routes/user.routes')
const templatesRouter = require('./routes/template.routes')

//const PORT = process.env.PORT || 8000
const PORT = process.env.PORT || 8080
//const hostname = "192.168.68.112";

const app = express()

const cors = require('cors');
app.use(cors({
    //origin: ['http://localhost:8081/', 'http://192.168.68.112:8081/', "http://94.180.34.73/"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*'
}));
app.use(express.static('public'));
app.use('/plot', express.static('plot'));

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', templatesRouter)

//app.listen(3000, '192.168.68.112:8080');
app.listen(PORT, () => console.log('server started on port ' + PORT))
//app.listen(PORT, hostname, () => console.log('server started on port ' + PORT))