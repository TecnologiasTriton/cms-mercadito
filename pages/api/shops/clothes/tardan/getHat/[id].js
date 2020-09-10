import admin from '../../../../../../lib/auth/firebaseAdmin'

export default async (req, res) => {
  const hatId = req.query.id
  console.log("Query")

  try {
    const hat = await admin.firestore().collection('tardan').doc(hatId).get()
    if(!hat.exists) return res.status(404).json({ message: "No se a encontrado ningún documento ;(" })

    return res.status(200).json(hat.data())
  } catch(e) {
    console.log(e.message)
    return res.status(400).json({ message: ":|" })
  }
}
