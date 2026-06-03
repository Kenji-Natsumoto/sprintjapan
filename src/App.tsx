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
import SuperVibeCodingV2 from "./pages/SuperVibeCodingV2";
import ProfileNatsumoto from "./pages/ProfileNatsumoto";
import AINativeCompany from "./pages/AINativeCompany";
import HarnessInfrastructure from "./pages/HarnessInfrastructure";
import EffectivenessOverEfficiency from "./pages/EffectivenessOverEfficiency";
import OrganizationOptimization from "./pages/OrganizationOptimization";
import ToolIntegrationGuide from "./pages/ToolIntegrationGuide";
import AIDiscoveryHome from "./pages/ai-discovery/Home";
import { Session1, Session2, Session3, Session4, Session5, Session6 } from "./pages/ai-discovery/Worksheet";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import ChatPopup from "./components/ChatPopup";
import ScrollToTop from "./components/ScrollToTop";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
          <Route path="/super-vibe-coding-full" element={<SuperVibeCodingV2 />} />
          <Route path="/profile/kenji_natsumoto" element={<ProfileNatsumoto />} />
          <Route path="/ai-native-company" element={<AINativeCompany />} />
          <Route path="/ai-native-company/" element={<AINativeCompany />} />
          <Route path="/ai-native-company/harness-infrastructure" element={<HarnessInfrastructure />} />
          <Route path="/ai-native-company/harness-infrastructure/" element={<HarnessInfrastructure />} />
          <Route path="/ai-native-company/effectiveness-over-efficiency" element={<EffectivenessOverEfficiency />} />
          <Route path="/ai-native-company/effectiveness-over-efficiency/" element={<EffectivenessOverEfficiency />} />
          <Route path="/ai-native-company/organization-optimization" element={<OrganizationOptimization />} />
          <Route path="/ai-native-company/organization-optimization/" element={<OrganizationOptimization />} />
          <Route path="/ai-native-company/tool-integration-guide" element={<ToolIntegrationGuide />} />
          <Route path="/ai-native-company/tool-integration-guide/" element={<ToolIntegrationGuide />} />
          <Route path="/ai-discovery-community" element={<AIDiscoveryHome />} />
          <Route path="/ai-discovery-community/" element={<AIDiscoveryHome />} />
          <Route path="/ai-discovery-community/worksheets/session-2" element={<Session2 />} />
          <Route path="/ai-discovery-community/worksheets/session-3" element={<Session3 />} />
          <Route path="/ai-discovery-community/worksheets/session-4" element={<Session4 />} />
          <Route path="/ai-discovery-community/worksheets/session-5" element={<Session5 />} />
          <Route path="/ai-discovery-community/worksheets/session-6" element={<Session6 />} />
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
