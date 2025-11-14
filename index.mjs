import { createServer } from 'http';
import { getData, setData } from './files.mjs';

const server = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/users' && req.method === 'GET') {
        res.writeHead(200);
        const users = await getData();
        return res.end(JSON.stringify(users));
    }

    if (req.url.startsWith('/users/') && req.method === 'GET') {
        const id = req.url.split('/')[2];
        const users = await getData();
        const user = users.find(el => el?.id === +id);
        if (!user) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                message: `User not found by ID: ${id}`
            }));
        }
        res.writeHead(200);
        return res.end(JSON.stringify(user));
    }

    if (req.url === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            const users = await getData();
            const newUser = {
                id: users.length ? users.at(-1)?.id + 1 : 1,
                ...JSON.parse(body)
            };
            users.push(newUser);
            await setData(users);
            res.writeHead(201);
            return res.end(JSON.stringify(newUser));
        });
    }

    if (req.url.startsWith('/users/') && req.method === 'PUT') {
        const id = req.url.split('/')[2];
        const users = await getData();
        const index = users.findIndex(el => el?.id === +id);
        if (index === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                message: `User not found by ID: ${id}`
            }));
        }
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            users[index] = {
                id: +id, ...JSON.parse(body)
            };
            await setData(users);
            res.writeHead(200);
            return res.end(JSON.stringify(users[index]));
        });
    }

    if (req.url.startsWith('/users/') && req.method === 'DELETE') {
        const id = req.url.split('/')[2];
        const users = await getData();
        const index = users.findIndex(el => el?.id === +id);
        if (index === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                message: `User not found by ID: ${id}`
            }));
        }
        users.splice(index, 1);
        await setData(users);
        res.writeHead(200);
        return res.end(JSON.stringify({}));
    }

    else {
        res.writeHead(404);
        return res.end(JSON.stringify({
            message: 'Page not found!'
        }));
    }
});

server.listen(3000, () => console.log('server running on port!', 3000));