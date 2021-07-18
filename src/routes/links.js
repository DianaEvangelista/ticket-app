const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, file,date, description } = req.body;
    const newLink = {
        title,
        file,
        date,
        report:description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO ticket set ?', [newLink]);
    req.flash('success', 'Ticket creado correctamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM ticket WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM ticket WHERE ID = ?', [id]);
    req.flash('success', 'Ticket eliminado correctamente');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM ticket WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description} = req.body; 
    const newLink = {
        title,
        report:description
    };
    await pool.query('UPDATE ticket set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Ticket actualizado correctamente');
    res.redirect('/links');
});

module.exports = router;