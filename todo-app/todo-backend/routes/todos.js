const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis')


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  if(todo) {
    const added = await getAsync('added');
    if(added) setAsync("added", +added + 1)
    else setAsync("added", 1)
  }
res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

singleRouter.get('/', async (req, res) => {
    res.json(req.todo); 
});

singleRouter.put('/', async (req, res) => {
  const { id } = req.todo
  const body = req.body
  const updated = await Todo.findOneAndUpdate({id: req.id}, body, {new: true})  
  res.json(updated); 
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
