import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();

router.get('/heatmap', (req, res) => {
try {
    const filePath = path.resolve('storage/store/heatMap.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data); 
    
    res.json(parsed); 
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при чтении файла' });
  }
})

export default router;
