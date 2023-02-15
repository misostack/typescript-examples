// import http from 'http';

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World 123');
// });

// server.listen(port, hostname, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

import express from 'express';
import { newEnforcer } from 'casbin';
import path from 'path';
import { CustomAdapter } from './casbin/custom-adapter';

const PORT = process.env.PORT ?? 1337;

const app = express();

app.use((req, res, next) => {
  Reflect.set(req, 'user', {
    id: req.query['userId'] || '',
  });
  next();
});
app.get('/', async (req, res) => {
  res.send('Index');
});

app.get('/users', async (req, res) => {
  // custom Adapter
  const enforcer = await newEnforcer(
    path.join(__dirname, 'casbin/basic_model.conf'),
    // path.join(__dirname, 'casbin/basic_policy.csv'),
    new CustomAdapter(),
  );
  const user: { id: string } = Reflect.get(req, 'user');
  const userId = user.id;
  const resource = 'users';
  const action = 'read';
  if (await enforcer.enforce(userId, resource, action)) {
    res.send('User Data');
  } else {
    res.status(403).send('Unauthorized');
  }
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}/`);
});
