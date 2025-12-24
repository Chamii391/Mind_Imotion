import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_classic.memory import ConversationBufferMemory
from langchain_classic.chains import ConversationChain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# Load environment variables (.env)
load_dotenv()

# -------------------- SYSTEM PROMPT --------------------
SYSTEM_PROMPT = """
You are a supportive mental health assistant.

Your role:
- Discuss mental health, emotions, stress, anxiety, sadness, motivation, and self-care.
- Provide general coping suggestions and emotional support.
- Be empathetic, calm, and non-judgmental.

STRICT RULES:
- DO NOT diagnose mental disorders.
- DO NOT prescribe medication.
- DO NOT provide medical or clinical treatment.
- Encourage healthy coping habits only.
- If user asks for medical advice, politely refuse and suggest professional help.

OUTPUT RULES:
- Keep responses short and supportive.
- Max 5 bullet points OR max 120 words.
- Avoid long explanations unless the user asks "explain more".
- Ask at most ONE gentle follow-up question if helpful.
"""

# -------------------- PROMPT TEMPLATE --------------------
prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# -------------------- GROQ MODEL --------------------
llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-8b-instant",
    temperature=0.7,
    max_tokens=200
)

# -------------------- MEMORY --------------------
memory = ConversationBufferMemory(
    return_messages=True
)

# -------------------- CONVERSATION CHAIN --------------------
chain = ConversationChain(
    llm=llm,
    prompt=prompt,
    memory=memory,
    verbose=False
)

# -------------------- CHAT FUNCTION --------------------
def ask_mental_health_bot(user_text: str) -> str:
    """
    Send a message to the mental health chatbot and get a supportive response.
    """
    if not user_text or not user_text.strip():
        return "Please share what you are feeling or thinking."

    response = chain.predict(input=user_text)
    return response
