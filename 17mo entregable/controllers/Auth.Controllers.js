const { userHandler } = require("../daos");

const updateUser = async (req, res, next) => {
    try {
        const data = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.full_phone[1],
            password: req.body.password
        }
        if(req.file){
            data.picture = req.file.filename
        }
        const user = await userHandler.updateUser(req.params.id, data);
        res.redirect('/profile');
      } catch (error) {
        next(error);
      }
}

module.exports = updateUser