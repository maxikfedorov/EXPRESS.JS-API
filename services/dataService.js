const Data = require('../models/dataModel.js');

const getAllDataStream = () => {
    return Data.find().cursor();
};

const getAllData = async () => {
    return await Data.find();
};

const getDataById = async (id) => {
    return await Data.findById(id);
};

const createData = async (name, value) => {
    const newData = new Data({
        name: name,
        value: value
    });

    return await newData.save();
};

const updateData = async (id, name, value) => {
    const data = await Data.findById(id);
    if (name != null) {
        data.name = name;
    }

    if (value != null) {
        data.value = value;
    }

    return await data.save();
};

const deleteData = async (id) => {
    const data = await Data.findById(id);
    await data.deleteOne();
};

module.exports = {
    getAllDataStream,
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData
};
