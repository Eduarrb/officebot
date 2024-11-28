const index = (req, res) => {
    res.render('landing/index', {
        title: 'OfficeBot'
    })
}

export {index};
