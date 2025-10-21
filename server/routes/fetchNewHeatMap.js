import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();

router.get('/heatmap', (req, res) => {  
  const symbol = req.query.symbol;

  try {
      const filePath = path.resolve('storage/store/heatMap.json');
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data); 
  
      if(!symbol){
        const heatMapCurrentSymbols = Object.keys(parsed);
        return res.json({symbols: heatMapCurrentSymbols});
      }

      const symbolData = parsed[symbol];
      console.log(symbolData)
      if (!symbolData) {
          return res.status(404).json({ error: `Symbol ${symbol} not found` });
      }

      res.json({ [symbol]: symbolData });
    } catch (err) {
      res.status(500).json({ error: 'Ошибка при чтении файла' });
    }
})

export default router;
