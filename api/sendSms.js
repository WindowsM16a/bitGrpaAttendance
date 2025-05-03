import twilio from "twilio";

export default async function handler(req, res) {
	if (req.method !== "POST") return res.status(405).end();

	const { body } = req.body;

	const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

	try {
		const message = await client.messages.create({
			body,
			from: process.env.TWILIO_PHONE,
			to: process.env.TWILIO_RECEIVER_PHONE,
		});

		res.status(200).json({ sid: message.sid });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
