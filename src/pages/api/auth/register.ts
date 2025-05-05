import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username, email, password, fullName } = req.body;

    // Validation
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        message:
          "Please provide all required fields: username, email, password, fullName",
      });
    }

    // Here you would typically save the user to your database
    // For this example, we'll just return a success response

    return res.status(201).json({
      success: true,
      data: {
        id: "12345",
        username,
        email,
        fullName,
        createdAt: new Date().toISOString(),
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration",
    });
  }
}
