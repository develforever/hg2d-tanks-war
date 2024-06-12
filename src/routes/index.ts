import express from 'express'
import debug from "@/frontend/javascripts/logger"

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Takns war' });
});

export default router;
