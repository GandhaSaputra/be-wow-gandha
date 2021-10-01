const { users, transaction } = require('../../models')


exports.getTransactions = async (req, res) => {
    try {

        const data = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            },
            include: [
                {
                    model: users,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'email']
                    }
                }
            ]
        })

        res.send({
            status: 'success',
            data: {
                transaction: data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransaction = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await transaction.findOne({
            where:{
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            },
            include: [
                {
                    model: users,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'email']
                    }
                }
            ]
        })

        res.send({
            status: 'success',
            data: {
                transaction: data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const data = req.body

        await transaction.create(data)

        res.send({
            status: 'success',
            message: 'Add transaction finished',
            data: {
                transaction: req.body,
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateTransaction = async (req, res) => {
    try {
      const { id } = req.params;
  
      await transaction.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Update transaction id: ${id} finished`,
        data: {
            transaction: req.body
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};