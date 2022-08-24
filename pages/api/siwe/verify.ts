import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body
        const siweMessage = new SiweMessage(message)
        const fields = await siweMessage.validate(signature)

        if (fields.nonce !== req.session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' })

        req.session.siwe = fields
        req.session.cookie.expires = new Date(fields.expirationTime as string)
        await req.session.save()
        res.json({ ok: true })
      } catch (_error) {
        req.session.siwe = undefined
        req.session.nonce = undefined
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const ironOptions = {
  cookieName: 'siwe',
  password: 'complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
