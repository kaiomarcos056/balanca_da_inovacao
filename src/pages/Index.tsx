import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Search, Sparkles } from "lucide-react";
import { BalanceCard } from "@/components/BalanceCard";
import { BalanceVerdict } from "@/components/BalanceVerdict";
import { getAnalysisForUrl, mockAnalyses } from "@/data/mockAnalysis";
import { toast } from "sonner";

const Index = () => {
  const [url, setUrl] = useState("");
  const [currentAnalysis, setCurrentAnalysis] = useState<ReturnType<typeof getAnalysisForUrl>>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!url.trim()) {
      toast.error("Por favor, insira uma URL");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const analysis = getAnalysisForUrl(url);
      
      if (analysis) {
        setCurrentAnalysis(analysis);
        toast.success("Análise concluída!");
      } else {
        toast.error("Site não encontrado em nossa base de dados", {
          description: "Experimente um dos sites de exemplo acima."
        });
      }
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const loadExample = (exampleUrl: string) => {
    setUrl(exampleUrl);
    const analysis = getAnalysisForUrl(exampleUrl);
    setCurrentAnalysis(analysis);
    toast.success("Exemplo carregado!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Balança da Inovação</h1>
                <p className="text-xs text-muted-foreground">Pesando riscos e benefícios do compartilhamento de dados</p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Protótipo de Pesquisa
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* URL Input Section */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Analisar Site</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Insira a URL de uma plataforma para visualizar a análise de riscos e benefícios
            </p>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="exemplo: replika.ai"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
              className="flex-1"
            />
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              {isAnalyzing ? "Analisando..." : "Analisar"}
            </Button>
          </div>

          {/* Example Sites */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">Sites de exemplo disponíveis:</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(mockAnalyses).map((site) => (
                <Button
                  key={site.url}
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(site.url)}
                  className="gap-2"
                >
                  <span className="font-medium">{site.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {site.category}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Analysis Results */}
        {currentAnalysis && (
          <div className="space-y-6">
            {/* Site Info Header */}
            <Card className="p-6 bg-gradient-to-r from-card to-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{currentAnalysis.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge>{currentAnalysis.category}</Badge>
                    <span className="text-sm text-muted-foreground">{currentAnalysis.url}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Balance Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <BalanceCard
                type="risk"
                items={currentAnalysis.risks}
                score={currentAnalysis.riskScore}
              />
              <BalanceCard
                type="benefit"
                items={currentAnalysis.benefits}
                score={currentAnalysis.benefitScore}
              />
            </div>

            {/* Verdict */}
            <BalanceVerdict
              riskScore={currentAnalysis.riskScore}
              benefitScore={currentAnalysis.benefitScore}
            />
          </div>
        )}

        {/* Empty State */}
        {!currentAnalysis && (
          <Card className="p-12 text-center">
            <Scale className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma análise carregada</h3>
            <p className="text-muted-foreground mb-6">
              Selecione um site de exemplo acima ou insira uma URL para começar
            </p>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Protótipo de Pesquisa - Testando a hipótese: <span className="font-medium">Benefício &gt; Risco</span></p>
        </div>
      </footer>
    </div>
  );
};

export default Index;