import { useState, useRef, useEffect, useMemo } from "react";
import { Send, Bot, User, Loader2, Plus, History, Trash2, MessageSquare, Search, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Message = { role: "user" | "assistant"; content: string };
type Conversation = {
  id: string;
  title: string;
  created_at: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const getSessionId = () => {
  let sessionId = localStorage.getItem("chat_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", sessionId);
  }
  return sessionId;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [conversationMessages, setConversationMessages] = useState<Record<string, string[]>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from("conversations")
      .select("id, title, created_at")
      .eq("session_id", sessionId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Failed to load conversations:", error);
      return;
    }
    setConversations(data || []);

    // Load message contents for search
    if (data && data.length > 0) {
      const conversationIds = data.map((c) => c.id);
      const { data: messagesData } = await supabase
        .from("chat_messages")
        .select("conversation_id, content")
        .in("conversation_id", conversationIds);

      if (messagesData) {
        const msgMap: Record<string, string[]> = {};
        messagesData.forEach((m) => {
          if (!msgMap[m.conversation_id]) {
            msgMap[m.conversation_id] = [];
          }
          msgMap[m.conversation_id].push(m.content);
        });
        setConversationMessages(msgMap);
      }
    }
  };

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();
    return conversations.filter((conv) => {
      // Search in title
      if (conv.title.toLowerCase().includes(query)) return true;

      // Search in messages
      const msgs = conversationMessages[conv.id] || [];
      return msgs.some((msg) => msg.toLowerCase().includes(query));
    });
  }, [conversations, conversationMessages, searchQuery]);

  const loadConversation = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to load messages:", error);
      return;
    }

    setMessages((data || []).map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
    setCurrentConversationId(conversationId);
    setShowHistory(false);
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };

  const deleteConversation = async (conversationId: string) => {
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
    loadConversations();
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
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">AIチャット</h1>
            <p className="text-muted-foreground">何でもお気軽にご質問ください</p>
          </div>

          <div className="flex gap-4">
            {/* Sidebar */}
            <div className={`${showHistory ? "block" : "hidden"} md:block w-64 flex-shrink-0`}>
              <div className="bg-card border border-border rounded-xl p-4 h-[600px] flex flex-col">
                <Button onClick={startNewConversation} className="w-full mb-4 gap-2">
                  <Plus size={18} />
                  新しい会話
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <History size={16} />
                  <span>履歴</span>
                </div>

                <div className="relative mb-3">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="履歴を検索..."
                    className="pl-9 pr-8 h-9 text-sm"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                      onClick={() => setSearchQuery("")}
                    >
                      <X size={14} />
                    </Button>
                  )}
                </div>

                <ScrollArea className="flex-1">
                  {filteredConversations.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      {searchQuery ? "検索結果がありません" : "履歴がありません"}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {filteredConversations.map((conv) => (
                        <div
                          key={conv.id}
                          className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                            currentConversationId === conv.id ? "bg-muted" : ""
                          }`}
                          onClick={() => loadConversation(conv.id)}
                        >
                          <MessageSquare size={16} className="text-muted-foreground flex-shrink-0" />
                          <span className="text-sm truncate flex-1">{conv.title}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteConversation(conv.id);
                            }}
                          >
                            <Trash2 size={14} className="text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1">
              <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-border md:hidden">
                  <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
                    <History size={18} className="mr-2" />
                    履歴
                  </Button>
                  <Button variant="ghost" size="sm" onClick={startNewConversation}>
                    <Plus size={18} className="mr-2" />
                    新規
                  </Button>
                </div>

                <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Bot size={48} className="mb-4 opacity-50" />
                      <p>メッセージを送信して会話を始めましょう</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          {msg.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Bot size={18} className="text-primary" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                              msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                          </div>
                          {msg.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                              <User size={18} className="text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      ))}
                      {isLoading && messages[messages.length - 1]?.role === "user" && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Bot size={18} className="text-primary" />
                          </div>
                          <div className="bg-muted rounded-2xl px-4 py-3">
                            <Loader2 size={18} className="animate-spin text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>

                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="メッセージを入力..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
