//const cors = require('cors');
const express = require('express');
const app = express();

//настройка сервера
const server = require('http').Server(app);
//подлючение сокетов
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

const rooms = new Map();

//позволяет в теле запроса отправлять json данные
app.use(express.json());
//разрешаем запросы
//app.use(cors());

//настройка веб приложения
app.get('/rooms', (req, res) => {
	res.json(rooms);
});

app.post('/rooms', (req, res) => {
	const { roomId, userName } = req.body;
	console.log(req.body);
	//ответит 200
	if (!rooms.has(roomId)) {
		rooms.set(
			roomId,
			new Map([
				['users', new Map()],
				['messages', []],
			]),
		);
	}
	res.send();
});

//настройка сокетов
//когда произойдет подключение, присвоится уникальный socket id
io.on('connection', (socket) => {
	console.log('user connected', socket.id);
});

//запуск сервера
server.listen(8888, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log('Server OK');
});
