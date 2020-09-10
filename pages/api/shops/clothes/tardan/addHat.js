import admin from '../../../../../lib/auth/firebaseAdmin'

export default async (req, res) => {
  const token = req.headers.token
  const hat = req.body

  if(!token || !hat) return res.status(400).json({ message: "Faltan datos" })

  try {
    const user = await admin.auth().verifyIdToken(token)
    if(!user.admin) return res.status(403).send(";(")

    await admin.firestore().collection('tardan').add(hat)
    res.status(200).send("Correcto")
  } catch(e) {
    res.status(400).send("Algo salio mal vuelve a intentarlo")
  }
}