const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));
app.use(express.static('./server/files'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.sendFile('index.html', {root : './'});
});
app.get('/get_list', (req, res) => {
    setTimeout(function () {
        res.send(getList());
    }, 500);
});
app.get('/get_cart_data', (req, res) => {
    res.send(getCartData());
});
app.post('/add_to_cart', upload.array(), (req, res) => {
    let params = req.body;
    if (!params || !params.id) res.send(JSON.stringify({error: `Id елемента должен присутствовать в запросе`}));
    let cart =  getCartData();
    let phones =  JSON.parse(fs.readFileSync("./server/files/phones.json"));

    let phone = phones.find(function (item) {
        return item.id == params.id;
    });

    if (phone) {
        cart.push(phone);
        let str = JSON.stringify(cart);
        fs.writeFileSync("./server/files/cart.json", str);
        setTimeout(function () {
            res.send(str);
        }, 500);
    } else {
        setTimeout(function () {
            res.send(JSON.stringify({error: `Элемент с id ${params.id} не найден`}));
        }, 500);
    }
});
app.delete('/delete_item_from_cart', upload.array(), (req, res) => {
    let params = req.body;
    if (!params || !params.id) res.send(JSON.stringify({error: `Элемент с id  ${params.id} отсутствует в корзине`}));
    let cart =  getCartData();
    let phone = cart.find(function (item) {
        return item.id == params.id;
    });
    if (phone) {
        cart = cart.filter(function (item) {
            return item.id !== params.id;
        });
        let str = JSON.stringify(cart);
        fs.writeFileSync("./server/files/cart.json", str);
        setTimeout(function () {
            res.send(str);
        }, 500);
    } else {
        setTimeout(function () {
            res.send(JSON.stringify({error: `Элемент с id  ${params.id} отсутствует в корзине`}));
        }, 500);
    }
});
app.post('/delete_item_from_cart', (req, res) => {
    res.send(JSON.stringify({error: `Для удаления элемента стоит ипользовать метод DELETE, а не POST`}));
});
app.post('/reset_cart', (req, res) => {
    fs.writeFileSync("./server/files/cart.json", JSON.stringify([]));
    res.send(JSON.stringify({ok: 'Корзина очищена'}));
});

app.use(function(req, res, next) {
    res.status(404).sendFile('404.html', {root	: './server'});
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});

function getCartData() {
    let cartData = fs.readFileSync("./server/files/cart.json");
    !cartData.length ? cartData = "[]" : null;
    return JSON.parse(cartData);
}
function getList() {
    return JSON.parse(fs.readFileSync("./server/files/phones.json"));
}