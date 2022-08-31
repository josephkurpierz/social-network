const {Thought, User} = require('../models');

const thoughtController = {
  addThought({params, body}, res) {
    Thought.create(body)
      .then(({_id})=>{
        return User.findOneAndUpdate(
          {_id: params.userId},
          {$push: {thoughts: _id}},
          {new:true}
        );
      })
      .then((dbUser) => {
        if(!dbUser){
          res.status(404).json({message: 'No user found with this id!'});
          return;
        }
        res.json(dbUser);
      })
      .catch(err => res.json(err));
  },
}