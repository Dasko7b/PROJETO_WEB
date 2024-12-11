import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/materias', async (req, res) =>{

    await prisma.Materia.create({
        data: {
            materia: req.body.materia,
            professor: req.body.professor,
            semestre: req.body.semestre,
            faltas: req.body.faltas
        }
    })

    res.status(201).json(req.body)
});

app.get('/materias', async (req, res) =>{

    const materias = await prisma.Materia.findMany()

    res.status(200).json(materias);
});

app.put('/materias/:id', async (req, res) =>{

    await prisma.Materia.update({
        where:{
            id: req.params.id
        },
        data: {
            materia: req.body.materia,
            professor: req.body.professor,
            semestre: req.body.semestre,
            faltas: req.body.faltas
        }
    })

    res.status(201).json(req.body)
});

app.delete('/materias/:id', async (req, res ) => {

    
    await prisma.Materia.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'Materia deletada'})
})



app.listen(3000)