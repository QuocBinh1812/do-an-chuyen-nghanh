const { lichchieu, movies } = require("../models");
const getAllLichChieu = async (req, res) => {
  try {
    const cinemaList = await movies.findAll({
      include: [
        {
          model: lichchieu,
        },
      ],
    });
    res.status(200).send(cinemaList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getDetailPhimLichChieu = async (req, res) => {
  const { id } = req.params;
  try {
    const cinemaList = await movies.findAll({
      include: [
        {
          model: lichchieu,
        },
      ],
      where: {
        id,
      },
    });
    res.status(200).send(cinemaList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllLichChieuTheLoai = (message) => async (req, res) => {
  try {
    const cinemaList = await movies.findAll({
      include: [
        {
          model: lichchieu,
        },
      ],
      where: {
        theloai: message,
      },
    });
    res.status(200).send(cinemaList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllLichChieuAdmin = async (req, res) => {
  try {
    const cinemaList = await lichchieu.findAll({
      include: [
        {
          model: movies,
        },
      ],
    });
    res.status(200).send(cinemaList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getDetailLichChieu = async (req, res) => {
  const { id } = req.params;

  try {
    const cinemaList = await lichchieu.findAll({
      include: [
        {
          model: movies,
        },
      ],
      where: {
        id,
      },
    });
    res.status(200).send(cinemaList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createLichChieu = async (req, res) => {
  const { giochieu, ngaychieu, rapchieu, movieId } = req.body;
  try {
    const newLichChieu = await lichchieu.create({
      giochieu,
      ngaychieu,
      rapchieu,
      movieId,
    });
    res.status(200).send(newLichChieu);
  } catch (error) {
    res.status(500).send(error);
  }
};
const removeLichChieu = async (req, res) => {
  const { id } = req.params;
  try {
    await lichchieu.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Xóa Thành Công");
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateLichChieu = async (req, res) => {
  const { id } = req.params;
  const { giochieu, ngaychieu, rapchieu, movieId } = req.body;
  try {
    const [countUpdate] = await lichchieu.update(
      { giochieu, ngaychieu, rapchieu, movieId },
      {
        where: {
          // id : id,
          id,
        },
      }
    );
    if (countUpdate > 0) {
      res.status(200).send("Update Success");
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getAllLichChieu,
  getAllLichChieuTheLoai,
  createLichChieu,
  removeLichChieu,
  updateLichChieu,
  getDetailPhimLichChieu,
  getDetailLichChieu,
  getAllLichChieuAdmin,
};
