import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import CaseStudies from "./pages/CaseStudies";
import Company from "./pages/Company";
import RFI from "./pages/RFI";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NewsAdmin from "./pages/NewsAdmin";
import VibeCodingLab from "./pages/VibeCodingLab";
import SuperVibeCoding from "./pages/SuperVibeCoding";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import ChatPopup from "./components/ChatPopup";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/vision" element={<Navigate to="/company#vision" replace />} />
          <Route path="/company" element={<Company />} />
          <Route path="/rfi" element={<RFI />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin/news" element={<NewsAdmin />} />
          <Route path="/vibe-coding-lab" element={<VibeCodingLab />} />
          <Route path="/super-vibe-coding" element={<SuperVibeCoding />} />
          <Route path="/chat" element={<Chat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
