import List from '../models/listModel.js';
import errorHandler from '../utils/error.js';

const createList = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const existingList = await List.findOne({ user: userId });

    if (existingList) {
      return res.status(400).json({ message: 'User already has an existing list' });
    }

    const list = await List.create(req.body);

    res.status(200).json({
      list,
      message: 'List created successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return next(errorHandler(404, 'List not found'));
    }

    if (req.user.id !== list.user.toString()) {
      return next(errorHandler(401, 'You can only delete your own list!'));
    }

    await List.findByIdAndDelete(req.params.id);
    res.status(200).json('List has been deleted');
  } catch (error) {
    next(error);
  }
};

const updateList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return next(errorHandler(404, 'List not found'));
    }

    if (req.user.id !== list.user.toString()) {
      return next(errorHandler(401, 'You can only edit your own list!'));
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedList);
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return next(errorHandler(404, 'List not found!'));
    }

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export { createList, deleteList, updateList, getList };
