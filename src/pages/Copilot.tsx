import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  tools_used?: string[];
}

const suggestedQuestions = [
  "What are the most critical security issues right now?",
  "How much money are we wasting on idle resources?",
  "Which resources should I fix first?",
  "Is our security posture improving or declining?",
];

// Fallback mock response if backend is offline
const mockFallback = {
  content: `## Security Assessment Summary

Based on the current scan of your infrastructure (290 resources), here are the key findings:

### 🔴 Critical Issues
Your environment has several critical exposures requiring immediate attention including publicly accessible S3 buckets, open SSH ports, and publicly accessible RDS instances.

### Priority Actions
1. **Today**: Block public access on all S3 buckets
2. **Today**: Restrict SSH security groups to known IPs only  
3. **This week**: Disable public accessibility on RDS instances
4. **This week**: Enable MFA for all IAM users

> ⚠️ Backend is offline — connect the API for real-time analysis.`,
  tools: ["get_critical_findings", "get_top_risks"],
};

const Copilot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || isTyping) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    // Call real backend
    fetch("https://cloud-security-copilot-qd4o.onrender.com/api/chat/", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ message: msg }),
    })
      .then(r => r.json())
      .then(res => {
        setMessages(prev => [...prev, {
          role:       "assistant",
          content:    res.response,
          tools_used: res.tools_used,
        }]);
      })
      .catch(() => {
        // Backend offline — show mock response
        setMessages(prev => [...prev, {
          role:       "assistant",
          content:    mockFallback.content,
          tools_used: mockFallback.tools,
        }]);
      })
      .finally(() => setIsTyping(false));
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Security Copilot
        </h1>
        <p className="text-muted-foreground">
          AI-powered cloud security assistant · Powered by Nova 2 Lite + Elasticsearch
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">

        {/* Empty state with suggested questions */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="w-16 h-16 rounded-md bg-secondary flex items-center justify-center border border-border">
              <Sparkles size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Ask about your infrastructure
              </h2>
              <p className="text-sm text-muted-foreground">
                The copilot queries your Elasticsearch data in real time to provide actionable insights.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-xl">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  disabled={isTyping}
                  className="text-left text-sm text-muted-foreground border border-border rounded-md px-4 py-3 hover:border-muted hover:text-foreground transition-colors bg-card disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message thread */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-primary" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-md px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-secondary text-foreground"
                  : "bg-card border border-border text-secondary-foreground"
              }`}
            >
              {/* Tool badges — shown for assistant messages */}
              {msg.role === "assistant" && msg.tools_used && msg.tools_used.length > 0 && (
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {msg.tools_used.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded"
                    >
                      ⚡ {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>

            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-md bg-secondary border border-border flex items-center justify-center shrink-0 mt-1">
                <User size={14} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="bg-card border border-border rounded-md px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-xs text-muted-foreground">
                Querying Elasticsearch + Nova...
              </span>
            </div>
          </div>
        )}
      </div>

    {/* Input bar */}
      <div className="border border-border rounded-md bg-card flex items-center gap-2 px-4 py-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your cloud security posture..."
          disabled={isTyping}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export default Copilot;