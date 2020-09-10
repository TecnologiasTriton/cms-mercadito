import admin from '../../lib/auth/firebaseAdmin'

export default async (req, res) => {
  const token = req.headers.token

  if(!token) return res.status(403).send(";(")

  try {
    const userToken = await admin.auth().verifyIdToken(token)
    if(!userToken.admin) return res.status(403).send(";(")

    return res.status(200).send("Estas autorizado!!")
  } catch(e) {
    console.log(e.message)
    return res.status(400).send("Algo salió mal ;(")
  }
}
