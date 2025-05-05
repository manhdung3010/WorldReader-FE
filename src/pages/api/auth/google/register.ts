import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { googleId, email, displayName, photo, username } = req.body;

    // Validation
    if (!googleId || !email || !username) {
      return res.status(400).json({
        message: "Missing required Google profile information",
      });
    }

    // Here you would typically save the Google user to your database
    // For this example, we'll just return a success response

    return res.status(201).json({
      success: true,
      data: {
        id: "12345",
        username,
        email,
        fullName: displayName,
        photo,
        googleId,
        createdAt: new Date().toISOString(),
      },
      message: "User registered with Google successfully",
    });
  } catch (error) {
    console.error("Google registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during Google registration",
    });
  }
}
