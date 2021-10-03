const { users, transaction } = require('../../models')


exports.getTransactions = async (req, res) => {
    try {

        if(req.user.id != 1){
            return res.send({
              status: "Failed",
              message: "Only admin can view transactions"
            })
          }

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
        // const {data} = req.body


        if(req.user.id != req.body.idUser){
            return res.send({
              status: "Failed",
              message: "Cannot add transaction"
            })
          }

        const newTransaction = await transaction.create({
            // ...data,
            idUser: req.body.idUser,
            transferProof: req.file.filename,
            remainingActive: 0,
            userStatus: "Not Active",
            paymentStatus: "Pending"
        })

        res.send({
            status: 'success',
            message: 'Add transaction finished',
            data: {
                transaction: {
                    ...newTransaction.dataValues
                }
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

      if(req.user.id != 1){
        return res.send({
          status: "Failed",
          message: "Only admin can update book"
        })
      }
  
      await transaction.update(
          {
            remainingActive: 30,
            userStatus: "Active",
            paymentStatus: req.body.paymentStatus,
          },
          {
            where: {
            id,
            },
          }
      );

      const newTransaction = await transaction.findOne({
        where: {
          id
        },
        include: {
            model: users,
            as: "user",
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password', 'email', 'role'],
            },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'idUser']
        },
      });
  
      res.send({
        status: "success",
        message: `Update transaction id: ${id} finished`,
        data: {
            transaction: {
                ...newTransaction.dataValues
            }
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