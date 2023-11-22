const List = require('../models/listModel.js')

const createList = async (req, res, next) => {

  const userId = req.params.id

  try {
    
    const existingList = await List.findOne({user: userId})

    if (existingList) return res.status(400).json({message: "User already has an existing list"})

    const { title, description, imageURL } = req.body
    console.log(req.body)
    const list = await List.create({
      title,
      description,
      imageURL,
      user: userId,
    })
    
    res.status(200).json({ 
      list,
      message: "List created successfully"
    })

  } catch (error) {
      console.error(error)
      next(error)
  }
}

module.exports = createList