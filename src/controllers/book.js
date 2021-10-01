// import models here
const { books, users } = require('../../models');

exports.getBooks = async (req, res) => {
  try {
    const data = await books.findAll({
      include: {
        model: users,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    res.send({
      status: 'success',
      data: {
        books: data
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getBook = async (req, res) => {
    try {
        const { id } = req.params;
    
        const data = await books.findOne({
          where: {
            id,
          },
          include: {
            model: users,
            as: "user",
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'idUser'],
          },
        });
    
        res.send({
          status: "success",
          data: {
            book: data,
          },
        });
      } catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "Server Error",
        });
      }
};

exports.addBook = async (req, res) => {
  try {
    const data = req.body;

    await books.create(data);

    res.send({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      await books.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Update book id: ${id} finished`,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};

exports.deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      await books.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Delete book id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };