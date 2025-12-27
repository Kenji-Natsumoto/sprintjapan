import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Send, Bot, User, Loader2, MessageCircle, X, Minimize2, Volume2, VolumeX, History, Plus, Trash2, MessageSquare, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Web Audio API notification sound generator
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
    oscillator.frequency.setValueAtTime(1100, audioContext.currentTime + 0.1); // C#6 note
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log("Audio notification not supported");
  }
};

type Message = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; created_at: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const EXCLUDED_PATHS = ["/contact", "/rfi", "/vibe-coding-lab", "/chat"];

const getSessionId = () => {
  let sessionId = localStorage.getItem("chat_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", sessionId);
  }
  return sessionId;
};

const ChatPopup = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check if current path should show the popup
  const shouldShow = !EXCLUDED_PATHS.some(path => location.pathname.startsWith(path));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset dismissed state when navigating to a new page
  useEffect(() => {
    setIsDismissed(false);
  }, [location.pathname]);

  // Load conversations when popup opens
  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

  const loadConversations = async () => {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from("conversations")
      .select("id, title, created_at")
      .eq("session_id", sessionId)
      .order("updated_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setConversations(data);
    }
  };

  const loadConversation = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
      setCurrentConversationId(conversationId);
      setShowHistory(false);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };

  const deleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase.from("conversations").delete().eq("id", conversationId);

    if (error) {
      toast({ title: "削除に失敗しました", variant: "destructive" });
      return;
    }

    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    if (currentConversationId === conversationId) {
      startNewConversation();
    }
    toast({ title: "会話を削除しました" });
  };

  if (!shouldShow || isDismissed) return null;

  const saveMessage = async (conversationId: string, role: "user" | "assistant", content: string) => {
    await supabase.from("chat_messages").insert({ conversation_id: conversationId, role, content });
  };

  const createOrUpdateConversation = async (firstMessage: string): Promise<string> => {
    if (currentConversationId) {
      await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", currentConversationId);
      return currentConversationId;
    }

    const sessionId = getSessionId();
    const title = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "");

    const { data, error } = await supabase
      .from("conversations")
      .insert({ session_id: sessionId, title })
      .select("id")
      .single();

    if (error || !data) {
      throw new Error("Failed to create conversation");
    }

    setCurrentConversationId(data.id);
    return data.id;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";
    let conversationId: string;

    try {
      conversationId = await createOrUpdateConversation(userMsg.content);
      await saveMessage(conversationId, "user", userMsg.content);
    } catch (error) {
      console.error("Failed to save user message:", error);
      setIsLoading(false);
      return;
    }

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "通信エラーが発生しました");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) updateAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (assistantContent) {
        await saveMessage(conversationId, "assistant", assistantContent);
        // Play notification sound when response is complete
        if (soundEnabled) {
          playNotificationSound();
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "エラーが発生しました。もう一度お試しください。";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
      await saveMessage(conversationId, "assistant", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle size={24} />
        </Button>
      ) : (
        <div className="bg-card border border-border rounded-xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              {showHistory ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setShowHistory(false)}
                >
                  <ChevronLeft size={18} />
                </Button>
              ) : (
                <Bot size={20} />
              )}
              <span className="font-medium">{showHistory ? "履歴" : "AIチャット"}</span>
            </div>
            <div className="flex items-center gap-1">
              {!showHistory && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setShowHistory(true)}
                    title="履歴を表示"
                  >
                    <History size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    title={soundEnabled ? "通知音をオフにする" : "通知音をオンにする"}
                  >
                    {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsDismissed(true)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* Content */}
          {showHistory ? (
            /* History View */
            <div className="h-72 flex flex-col">
              <div className="p-2 border-b border-border">
                <Button onClick={startNewConversation} size="sm" className="w-full gap-2">
                  <Plus size={14} />
                  新しい会話
                </Button>
              </div>
              <ScrollArea className="flex-1 p-2">
                {conversations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">履歴がありません</p>
                ) : (
                  <div className="space-y-1">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                          currentConversationId === conv.id ? "bg-muted" : ""
                        }`}
                        onClick={() => loadConversation(conv.id)}
                      >
                        <MessageSquare size={14} className="text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate flex-1">{conv.title}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => deleteConversation(conv.id, e)}
                        >
                          <Trash2 size={12} className="text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          ) : (
            /* Messages View */
            <ScrollArea className="h-72 p-3" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
                  <Bot size={36} className="mb-2 opacity-50" />
                  <p>何でもお気軽にご質問ください</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot size={14} className="text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                          msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <User size={14} className="text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-primary" />
                      </div>
                      <div className="bg-muted rounded-xl px-3 py-2">
                        <Loader2 size={14} className="animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          )}

          {/* Input - hide when showing history */}
          {!showHistory && (
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="メッセージを入力..."
                  disabled={isLoading}
                  className="flex-1 h-9 text-sm"
                />
                <Button onClick={sendMessage} disabled={isLoading || !input.trim()} size="sm" className="h-9">
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPopup;