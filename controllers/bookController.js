const Book = require('../db').model('Book');
const router = require('express').Router();

router.post('/', (req, res) => {
    let reqBook = req.body.book;

    Book.create({
        name : reqBook.name,
        author : reqBook.author,
        genre : reqBook.genre,
        pubYear : reqBook.pubYear,
        rating : reqBook.rating,
        userId : req.user.id
    })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(500).json(err));
});

router.get('/', (req, res) => {
    Book.findAll({ where : { userId : req.user. id }})
        .then(books => res.status(200).json(books))
        .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    let reqBook = req.body.book;

    Book.update({
        name : reqBook.name,
        author : reqBook.author,
        genre : reqBook.genre,
        pubYear : reqBook.pubYear,
        rating : reqBook.rating,
    },
        {
            where : {
                id : req.params.id,
                userId : req.user.id
            }
        })
        .then(recordsChanged => res.status(200).json(`${recordsChanged} record(s) changed.`))
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
    Book.destroy({ where : {
        id : req.params.id,
        userId : req.user.id
    }})
    .then(recordsChanged => res.status(200).json(`${recordsChanged} record(s) deleted.`))
    .catch(err => res.status(500).json(err));
});


module.exports = router;