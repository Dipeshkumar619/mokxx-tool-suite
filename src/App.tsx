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
import CalorieCalculator from "./pages/tools/fitness/CalorieCalculator";
import ProteinIntakeCalculator from "./pages/tools/fitness/ProteinIntakeCalculator";
import MacroCalculator from "./pages/tools/fitness/MacroCalculator";
import JSONFormatter from "./pages/tools/developer/JSONFormatter";
import UUIDGenerator from "./pages/tools/developer/UUIDGenerator";
import Base64EncoderDecoder from "./pages/tools/developer/Base64EncoderDecoder";
import TimezoneConverter from "./pages/tools/developer/TimezoneConverter";
import TimestampConverter from "./pages/tools/developer/TimestampConverter";
import RegexTester from "./pages/tools/developer/RegexTester";
import WordCounter from "./pages/tools/text/WordCounter";
import CaseConverter from "./pages/tools/text/CaseConverter";
import CharacterCounter from "./pages/tools/text/CharacterCounter";
import TextSorter from "./pages/tools/text/TextSorter";
import DuplicateLineRemover from "./pages/tools/text/DuplicateLineRemover";
import SlugGenerator from "./pages/tools/seo/SlugGenerator";
import MetaTagGenerator from "./pages/tools/seo/MetaTagGenerator";
import KeywordDensityChecker from "./pages/tools/seo/KeywordDensityChecker";
import OpenGraphPreview from "./pages/tools/seo/OpenGraphPreview";
import ImageCompressor from "./pages/tools/media/ImageCompressor";
import ImageConverter from "./pages/tools/media/ImageConverter";
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
          {/* Fitness */}
          <Route path="/tools/fitness/one-rep-max-calculator" element={<OneRepMaxCalculator />} />
          <Route path="/tools/fitness/bmi-calculator" element={<BMICalculator />} />
          <Route path="/tools/fitness/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/tools/fitness/protein-intake-calculator" element={<ProteinIntakeCalculator />} />
          <Route path="/tools/fitness/macro-calculator" element={<MacroCalculator />} />
          {/* Developer */}
          <Route path="/tools/developer/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/developer/uuid-generator" element={<UUIDGenerator />} />
          <Route path="/tools/developer/base64-encoder-decoder" element={<Base64EncoderDecoder />} />
          <Route path="/tools/developer/timezone-converter" element={<TimezoneConverter />} />
          <Route path="/tools/developer/timestamp-converter" element={<TimestampConverter />} />
          <Route path="/tools/developer/regex-tester" element={<RegexTester />} />
          {/* Text */}
          <Route path="/tools/text/word-counter" element={<WordCounter />} />
          <Route path="/tools/text/case-converter" element={<CaseConverter />} />
          <Route path="/tools/text/character-counter" element={<CharacterCounter />} />
          <Route path="/tools/text/text-sorter" element={<TextSorter />} />
          <Route path="/tools/text/duplicate-line-remover" element={<DuplicateLineRemover />} />
          {/* SEO */}
          <Route path="/tools/seo/slug-generator" element={<SlugGenerator />} />
          <Route path="/tools/seo/meta-tag-generator" element={<MetaTagGenerator />} />
          <Route path="/tools/seo/keyword-density-checker" element={<KeywordDensityChecker />} />
          <Route path="/tools/seo/open-graph-preview" element={<OpenGraphPreview />} />
          {/* Media */}
          <Route path="/tools/media/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/media/image-converter" element={<ImageConverter />} />
          {/* Generic fallback for unimplemented tools */}
          <Route path="/tools/:categorySlug/:toolSlug" element={<GenericToolPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
