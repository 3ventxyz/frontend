import { NextApiRequest, NextApiResponse } from 'next'
import AllowlistService from '../../../../services/allowlists'
import MerkleGenerator from '../../../../services/merkle_generator'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { lid } = req.query
  const allowlistService = new AllowlistService()

  switch (method) {
    case 'GET':
      try {
        if (lid) {
          const response = await allowlistService.getAllowlist(lid.toString())
          if (response?.success && response.data) {
            const merkle = new MerkleGenerator(response.data.allowlist)
            const root = merkle.rootGenerator()

            return res.status(200).json({ root: root })
          }
          throw Error('Invalid allowlist id')
        }
      } catch (e: any) {
        return res.status(400).json({ error: e.message })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
