let { PythonShell } = require('python-shell');
const app = require('express')();

app.get('/api', (req, res) => {
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '../nextjs-serverless/api',
    args: ['chaco', req.query.value1],
  };
  //res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  PythonShell.run('main.py', options).then((messages) => {
    // results is an array consisting of messages collected during execution
    console.log('results: %j', messages);
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.json({ name: messages });
  });
});

module.exports = app;
