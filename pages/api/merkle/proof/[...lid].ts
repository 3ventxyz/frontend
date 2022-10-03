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
        if (lid?.length === 2) {
          const response = await allowlistService.getAllowlist(
            (lid as Array<string>)[0]
          )

          if (response?.success && response.data) {
            const merkle = new MerkleGenerator(response.data.allowlist)
            const proof = merkle.proofGenerator(
              (lid as Array<string>)[1]?.toString() ?? ''
            )
            if (proof) {
              return res.status(200).json({ proof: proof })
            } else {
              throw Error('Invalid allowlist id or address')
            }
          }
          throw Error('Invalid allowlist id or address')
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
