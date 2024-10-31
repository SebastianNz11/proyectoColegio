import express from 'express';
import { asignarNota, obtenerEstudiantesCurso, obtenerNotasPorCurso, obtenerNotasPorEstudiante, obtenerNotasPorIdPadre } from '../controllers/nota.controller.js';

const router = express.Router();



// Ruta para obtener estudiantes de un curso asignado a un profesor
router.post('/profesor/:id_profesor/curso/:id_curso/asignar-nota', asignarNota);
router.get('/curso/:id_curso/estudiantes', obtenerEstudiantesCurso);
router.get('/cursos/:id_curso/notas', obtenerNotasPorCurso);
router.get('/:userId/notas', obtenerNotasPorEstudiante);
router.get('/padre/:id_padre/notas', obtenerNotasPorIdPadre);



export default router;
