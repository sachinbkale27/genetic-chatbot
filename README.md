# Genetics Assistant AI

A React-based web chatbot interface that connects to a custom genetics-focused LLM backend. Users can ask questions about genetics, DNA, molecular biology, and medical topics.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Bootstrap 5
- **Backend**: Connects to [genetic-api](https://github.com/sachinbkale27/genetic-api) (FastAPI + HuggingFace Inference Endpoint)

## Project Structure

```
genetic-chatbot/
├── src/
│   ├── components/
│   │   ├── Chat.tsx          # Main chat container with sidebar & messages
│   │   ├── ChatInput.tsx     # 4-row textarea input with send button
│   │   └── ChatMessage.tsx   # Message bubble (user/assistant styles)
│   ├── services/
│   │   └── api.ts            # API client for genetic-api backend
│   ├── types/
│   │   └── chat.ts           # TypeScript interfaces (Message, ChatRequest, ChatResponse)
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Bootstrap + custom styles
├── .env.example              # Environment config template
├── vite.config.ts            # Vite config with API proxy to localhost:8000
└── package.json
```

## Features

- **Left Sidebar** - Sample questions panel with pre-defined genetics/medical questions
- **Chat Interface** - Message bubbles with user (green) and assistant (gray) styling
- **Loading Indicator** - Animated dots while waiting for response
- **Clear Chat Button** - Appears in header when messages exist
- **Error Handling** - Displays API errors in red alert
- **API Proxy** - Vite proxies `/api` requests to `localhost:8000` (avoids CORS)

## Setup

```bash
# Install dependencies
npm install

# Configure API key
cp .env.example .env
# Edit .env with your API key
```

## Development

```bash
# Start the backend (genetic-api) first
cd ../genetic-api
uvicorn app.main:app --reload

# Start the frontend
cd ../genetic-chatbot
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Configuration

| Variable | Description |
|----------|-------------|
| `VITE_API_KEY` | API key for authenticating with genetic-api backend |

## How It Works

1. User types a question or clicks a sample question
2. Frontend sends POST to `/api/v1/chat` with message and optional conversation ID
3. Backend forwards to HuggingFace endpoint running `genetics-llm-lora-v1` model
4. Response displayed in chat (may take up to 3 minutes on cold start)

## Related Repositories

- **Backend API**: https://github.com/sachinbkale27/genetic-api
- **LLM Model**: https://huggingface.co/sachinbkale27/genetics-llm-lora-merged-v1
