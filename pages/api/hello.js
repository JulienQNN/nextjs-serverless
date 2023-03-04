let { PythonShell } = require('python-shell');

export default function handler(req, res) {
  console.log(req.query);

  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '../nextjs-serverless/pages/python',
    args: ['chaco', req.query.value1],
  };

  PythonShell.run('main.py', options).then((messages) => {
    // results is an array consisting of messages collected during execution
    console.log('results: %j', messages);
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.json({ name: messages });
  });
}
