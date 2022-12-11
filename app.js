const express = require('express')
const path = require('path')

const session = require('express-session')
const SessionStore = require("connect-mongodb-session")(session)

const homeRouter = require('./routes/homeRoutes')
const productRouter=require('./routes/productRoute')
const authRouter = require('./routes/authRoute')
const cartRouter=require('./routes/CartRouter')
const orderRouter=require('./routes/orderRoute')
const adminRouter = require("./routes/adminRoute");

const flash = require('connect-flash');
const app = express()

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb://127.0.0.1/online-shop',
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secret to hash express sessions', //write anything that make anyone hard to guess it,
    saveUninitialized: false,
    resave: false,
    store:STORE
    /* cookie: {
        maxAge:1*60*60*100
    }*/
}))

app.set('view engine', 'ejs')
app.set('views', 'views')//default

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/cart',cartRouter)
app.use('/', orderRouter)
app.use("/admin", adminRouter)
app.get("/not-admin", (req, res, next) => {
    res.status(403);
    res.render("not-admin", {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: "Not Allowed"
    });
});

app.listen(3000, () => {
    console.log('server listen on http://localhost:3000/')
})