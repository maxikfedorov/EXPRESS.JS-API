const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService.js');

router.get('/', async (req, res) => {
    try {
        const data = await dataService.getAllData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//GET-ALL in the role of flux methodology
router.get('/flux', (req, res) => {
    const stream = dataService.getAllDataStream();

    stream.on('data', (doc) => {
        res.write(JSON.stringify(doc) + '\n');
    });

    stream.on('error', (err) => {
        res.status(500).json({ message: err.message });
    });

    stream.on('end', () => {
        res.end();
    });
});

router.get('/:id', async (req, res) => {
    try {
        const data = await dataService.getDataById(req.params.id);
        if (data == null) {
            return res.status(404).json({ message: 'Не найдено данных с данным ID' });
        }
        res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const savedData = await dataService.createData(req.body.name, req.body.value);
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await dataService.updateData(req.params.id, req.body.name, req.body.value);
        res.json(updatedData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await dataService.deleteData(req.params.id);
        res.json({ message: 'Данные успешно удалены' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
