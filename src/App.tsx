import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import OneRepMaxCalculator from "./pages/tools/fitness/OneRepMaxCalculator";
import BMICalculator from "./pages/tools/fitness/BMICalculator";
import JSONFormatter from "./pages/tools/developer/JSONFormatter";
import UUIDGenerator from "./pages/tools/developer/UUIDGenerator";
import Base64EncoderDecoder from "./pages/tools/developer/Base64EncoderDecoder";
import WordCounter from "./pages/tools/text/WordCounter";
import CaseConverter from "./pages/tools/text/CaseConverter";
import SlugGenerator from "./pages/tools/seo/SlugGenerator";
import TimezoneConverter from "./pages/tools/developer/TimezoneConverter";
import GenericToolPage from "./pages/tools/GenericToolPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools/:categorySlug" element={<CategoryPage />} />
          {/* Implemented tools */}
          <Route path="/tools/fitness/one-rep-max-calculator" element={<OneRepMaxCalculator />} />
          <Route path="/tools/fitness/bmi-calculator" element={<BMICalculator />} />
          <Route path="/tools/developer/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/developer/uuid-generator" element={<UUIDGenerator />} />
          <Route path="/tools/developer/base64-encoder-decoder" element={<Base64EncoderDecoder />} />
          <Route path="/tools/text/word-counter" element={<WordCounter />} />
          <Route path="/tools/text/case-converter" element={<CaseConverter />} />
          <Route path="/tools/seo/slug-generator" element={<SlugGenerator />} />
          {/* Generic fallback for unimplemented tools */}
          <Route path="/tools/:categorySlug/:toolSlug" element={<GenericToolPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
