const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre");

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      hospital: medicoDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const actualizarMedico = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medicolDB = await Medico.findById(id);

    if (!medicolDB) {
      return res.status(404).json({
        ok: false,
        msg: "Medico no encontrado",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const borrarMedico = async (req, res) => {
  const id = req.params.id;

  try {
    const medicolDB = await Medico.findById(id);

    if (!medicolDB) {
      return res.status(404).json({
        ok: false,
        msg: "Medico no encontrado",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Medico Borrado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
