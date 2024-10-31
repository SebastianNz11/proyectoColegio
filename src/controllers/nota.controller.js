import { Nota } from '../models/nota.model.js';
import { Profesor } from '../models/profesor.model.js';
import { Curso } from '../models/curso.model.js';
import { Estudiante } from '../models/estudiante.model.js';


// Asignar una nota a los estudiantes del curso
export const asignarNota = async (req, res) => {
  const { id_profesor, id_curso } = req.params; // Obtener el ID del profesor y del curso
  const { bimestre, notas } = req.body; // Notas debe ser un arreglo de objetos { id_estudiante, nota }

  try {
    // Verificar si el profesor tiene asignado ese curso
    const profesor = await Profesor.findOne({
      where: { id_profesor, id_curso },
    });

    if (!profesor) {
      return res.status(403).json({ message: 'No tienes acceso a este curso.' });
    }

    // Asignar notas a cada estudiante
    const asignaciones = [];

    for (const { id_estudiante, nota } of notas) {
      const notaAsignada = await Nota.create({
        id_estudiante,
        id_curso,
        bimestre,
        nota,
      });
      asignaciones.push(notaAsignada);
    }

    res.status(201).json({ message: 'Notas asignadas exitosamente.', asignaciones });
  } catch (error) {
    console.error('Error al asignar notas:', error);
    res.status(500).json({ message: 'Error al asignar notas.', error: error.message });
  }
};


// Obtener estudiantes de un curso
export const obtenerEstudiantesCurso = async (req, res) => {
  const { id_curso } = req.params;

  try {
    // Obtener estudiantes que están asignados a este curso
    const estudiantes = await Estudiante.findAll({
      where: { id_grado: id_curso } // Asumiendo que 'id_grado' se relaciona con 'id_curso', ajusta si es necesario.
    });

    if (estudiantes.length === 0) {
      return res.status(404).json({ message: 'No hay estudiantes asignados a este curso.' });
    }

    res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes del curso:', error);
    res.status(500).json({ message: 'Error al obtener estudiantes.', error: error.message });
  }
};





export const obtenerNotasPorCurso = async (req, res) => {
  try {
      // Obtener el ID del curso desde los parámetros de la solicitud
      const { id_curso } = req.params;

      // Obtener todas las notas de estudiantes asignados al curso especificado
      const notas = await Nota.findAll({
          where: { id_curso: id_curso },
          include: [
              {
                  model: Estudiante,
                  attributes: ['id_estudiante', 'nombres', 'apellidos'], // Ajusta los atributos según sea necesario
              }
          ],
      });

      // Verifica si se encontraron notas
      if (notas.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron notas para este curso.' });
      }

      // Responde con las notas encontradas
      return res.status(200).json(notas);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al obtener las notas.' });
  }
};




// controllers/NotasController.js
export const obtenerNotasPorEstudiante = async (req, res) => {
    try {
        const { userId } = req.params;

        // Obtener las notas del estudiante
        const notas = await Nota.findAll({
            where: { id_estudiante: userId },
            include: [
                {
                    model: Curso,
                    attributes: ['nombre_curso'], // Incluye el nombre del curso
                },
            ],
        });

        if (notas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron notas' });
        }

        res.json(notas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



export const obtenerNotasPorIdPadre = async (req, res) => {
  const { id_padre } = req.params;

  try {
      // Primero, obtenemos los estudiantes asociados al padre
      const estudiantes = await Estudiante.findAll({ where: { id_padre } });

      if (estudiantes.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron estudiantes para este padre.' });
      }

      const notas = await Nota.findAll({
          where: {
              id_estudiante: estudiantes.map(estudiante => estudiante.id_estudiante),
          },
          include: {
              model: Curso,
              as: 'curso', 
          },
      });

      res.json(notas);
  } catch (error) {
      console.error('Error al obtener las notas:', error);
      res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};