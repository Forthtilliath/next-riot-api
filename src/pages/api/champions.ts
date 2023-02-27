import type { NextApiRequest, NextApiResponse } from 'next';

import { getChampions } from '@/utils/api/apiRiot';

type Data = {
  champions: Awaited<ReturnType<typeof getChampions>>;
};

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  const champions = await getChampions();
  res.status(200).json({ champions });
}
