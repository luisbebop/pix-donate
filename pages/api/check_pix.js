export default async function handler(req, res) {
  let uuid = req.query.uuid

  const client = await fetch(`https://api.infinitepay.io/v2/transactions/${uuid}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Env': 'production',
      'Authorization': process.env.API_KEY_INFINITEPAY,
    }
  })

  const data = await client.json()
  res.status(200).json(data.data)
}