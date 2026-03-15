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

const mockResponses: Record<string, { content: string; tools: string[] }> = {
  default: {
    content: `## Security Assessment Summary

Based on the current scan of your 14 clusters (290 resources), here are the key findings:

### 🔴 Critical Issues (4)
1. **S3 Bucket Publicly Accessible** — \`s3-customer-data-482\` contains 847K objects (2.3TB) exposed to the internet. Risk Score: 95/100
2. **S3 Backup Bucket Public** — \`s3-backup-logs-117\` with 890GB exposed. Risk Score: 95/100  
3. **RDS Publicly Accessible** — Production MySQL \`rds-prod-mysql-42\` reachable from internet. Risk Score: 92/100
4. **SSH Open to Internet** — Security group \`sg-a3f8e21b\` exposes port 22 to 0.0.0.0/0. Risk Score: 90/100

### Priority Actions
1. **Today**: Block public access on both S3 buckets immediately
2. **Today**: Disable public accessibility on the production RDS instance
3. **This week**: Restrict SSH security group to bastion host IPs only
4. **This week**: Enable MFA for all IAM users (5 without MFA)

### 💰 Cost Optimization
- **$1,580/mo** ($18,960/yr) wasted on 6 underutilized instances
- Largest waste: \`ec2-idle-77\` (m5.xlarge at 1.3% CPU) — $234.50/mo wasted`,
    tools: ["get_critical_findings", "get_high_findings", "get_cost_waste", "get_top_risks"],
  },
};

const Copilot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = mockResponses.default;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: resp.content, tools_used: resp.tools },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Security Copilot</h1>
        <p className="text-muted-foreground">AI-powered cloud security assistant · Powered by Nova 2 Lite</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="w-16 h-16 rounded-md bg-secondary flex items-center justify-center border border-border">
              <Sparkles size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground mb-1">Ask about your infrastructure</h2>
              <p className="text-sm text-muted-foreground">The copilot queries your security data to provide actionable insights.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-xl">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-left text-sm text-muted-foreground border border-border rounded-md px-4 py-3 hover:border-muted hover:text-foreground transition-colors bg-card"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
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
              {msg.role === "assistant" && msg.tools_used && (
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {msg.tools_used.map((t) => (
                    <span key={t} className="text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                      {t}
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

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="bg-card border border-border rounded-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border border-border rounded-md bg-card flex items-center gap-2 px-4 py-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your cloud security posture..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export default Copilot;
