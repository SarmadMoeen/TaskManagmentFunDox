
const Task = require('../models/task')


exports.PostTask = async (req,res)=>{
  try{
      const addingTask = new Task();
      addingTask.title = req.body.title;
      addingTask.description = req.body.description;
      console.log(req.body)

      try{
          const insertTask = await addingTask.save()
          console.log(insertTask);
          res.status(201).send(insertTask)
  
      }
      catch(e){
          console.log(e);
      }
  }catch(e){
      res.send(e)
  }
}

exports.GetTasks = async (req,res)=>{
  try{
      const getTasks = await Task.find({})
      res.send(getTasks)
  }catch(e){
  res.send(e)
}
}

exports.GetTask = async (req,res)=>{
  try{
          const _id = req.params.id
          const getTask = await Task.find({_id})
          res.send(getTask)
  }catch(e){
      res.send(e)
  }
}
exports.UpdateTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateTask = await Task.findByIdAndUpdate(
      _id,
      { completed: req.body.completed },
      { new: true }
    );
    res.send(updateTask);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.DeleteTask = async (req,res)=>{
  try{
          const deleteTask = await Task.findByIdAndDelete(req.params.id)
          res.send(deleteTask)
  }catch(e){
      res.send(e)
  }
}