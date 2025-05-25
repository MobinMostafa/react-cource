import express from 'express';

const router = express.Router();


router.get('/auth/login', (req, res) => {
  res.send('Login route');
});
router.get('/auth/register', (req, res) => {
  res.send('Register route');
});

export default router;