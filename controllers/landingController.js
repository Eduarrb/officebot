const index = (req, res) => {
    res.render('landing/index', {
        title: 'OfficeBot',
        csrfToken: req.csrfToken(),
    })
}

export {index};
