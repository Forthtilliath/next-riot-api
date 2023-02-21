import { getChampions } from "@/apiRiot";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  champions: Awaited<ReturnType<typeof getChampions>>;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const champions = await getChampions();
  res.status(200).json({ champions });
}
