import admin from '../../../../../../lib/auth/firebaseAdmin'

export default async (req, res) => {
  const token = req.headers.token
  const id = req.query.id
  const data = req.body

  try {
    if(!token || !data) return res.status(400).json({ message: "Faltan datos" })
    const userToken = await admin.auth().verifyIdToken(token)
    if(!userToken.admin) return res.status(403).json({ message: ";(" })

    await admin.firestore().collection('tardan').doc(id).update(data)

    res.status(200).json({ message: data.name })
  } catch(e) {
    console.log(e.message)
    res.status(500).json({ message: ":|" })
  }
}