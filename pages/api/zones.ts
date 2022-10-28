import type { NextApiRequest, NextApiResponse } from 'next';
import { getEstudiantesWithResidencias } from './../../lib/connection';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  getEstudiantesWithResidencias()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json({ message: 'error !' });
    });
};
