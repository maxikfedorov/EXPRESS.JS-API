const express = require('express');
const router = express.Router();
const userService = require('../services/userService.js');

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Не найдено пользователя с данным ID' });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const savedUser = await userService.createUser(req.body.username, req.body.password, req.body.email);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body.username, req.body.password, req.body.email);
        res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
