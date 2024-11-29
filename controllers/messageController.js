import openai from "openai";

const openAIAPI = new openai(process.env.OPENAI_API_KEY);

const postMessage = async (req, res) => {
    const { prompt, previousMessage } = req.body;

    let messages = [];
    if(previousMessage) {
        messages[0] = {
            role: 'assistant',
            content: previousMessage
        }
    }

    messages.push({
        role: "user",
        content: prompt,
    })
    try {
        const aiResponse = await openAIAPI.chat.completions.create({
            model: "gpt-3.5-turbo",
         
            messages: messages
        });

        res.json({
            message: aiResponse.choices[0].message.content,
            role: aiResponse.choices[0].message.role,
        });
    } catch (error) {
        console.error(error);
    }
}

export {
    postMessage
}