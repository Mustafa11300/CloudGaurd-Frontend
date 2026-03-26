import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

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

const mockFallback = {
  content: `## Security Assessment Summary

Based on the current scan of your infrastructure (290 resources), here are the key findings:

### Critical Issues
Your environment has several critical exposures requiring immediate attention including publicly accessible S3 buckets, open SSH ports, and publicly accessible RDS instances.

### Priority Actions
1. **Today**: Block public access on all S3 buckets
2. **Today**: Restrict SSH security groups to known IPs only  
3. **This week**: Disable public accessibility on RDS instances
4. **This week**: Enable MFA for all IAM users

> Backend is offline — connect the API for real-time analysis.`,
  tools: ["get_critical_findings", "get_top_risks"],
};

const Copilot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

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
      {/* Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Security Copilot
        </h1>
        <p className="text-muted-foreground">
          AI-powered cloud security assistant · Powered by Nova 2 Lite + Elasticsearch
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">

        {/* Empty state */}
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
            {/* Bot avatar */}
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
              {/* Tool badges */}
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

              {/* Message content */}
              {msg.role === "user" ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-base font-bold text-foreground mt-4 mb-2 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-sm font-semibold text-foreground mt-3 mb-1.5 first:mt-0">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm text-secondary-foreground leading-relaxed mb-2 last:mb-0">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-1 my-2 ml-3">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="space-y-1 my-2 ml-3 list-decimal list-inside">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm text-secondary-foreground flex gap-2 items-start">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        <span>{children}</span>
                      </li>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = className?.includes("language-");
                      return isBlock ? (
                        <code className="block bg-secondary border border-border rounded-md px-3 py-2 text-xs font-mono text-primary my-2 overflow-x-auto whitespace-pre">
                          {children}
                        </code>
                      ) : (
                        <code className="bg-secondary text-primary px-1.5 py-0.5 rounded text-xs font-mono">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-secondary border border-border rounded-md p-3 my-2 overflow-x-auto">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-warning pl-3 my-2 text-warning text-xs italic">
                        {children}
                      </blockquote>
                    ),
                    hr: () => (
                      <hr className="border-border my-3" />
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              )}
            </div>

            {/* User avatar */}
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