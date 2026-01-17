# Genetics Assistant AI

A React chatbot for interacting with the genetics-llm-lora-v1 model.

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
| `VITE_API_KEY` | API key for the genetic-api backend |
