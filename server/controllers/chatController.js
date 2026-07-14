import { groqChatCompletion } from "../services/groqClient.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const { completion, modelUsed } = await groqChatCompletion({
      messages: [
        {
          role: "system",
          content: `
You are CineMentor, an expert movie assistant inside SceneTheory.

Help users with:
- Movie recommendations
- Similar movies
- Genres
- Movie endings
- Fan theories
- Actors
- Directors
- Streaming suggestions

Keep responses friendly, concise and engaging.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    console.log(`[chatController] Reply generated using model: ${modelUsed}`);

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI Error",
    });
  }
};
