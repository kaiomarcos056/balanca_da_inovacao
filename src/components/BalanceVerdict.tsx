import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scale, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";

interface BalanceVerdictProps {
  riskScore: number;
  benefitScore: number;
}

export const BalanceVerdict = ({ riskScore, benefitScore }: BalanceVerdictProps) => {
  const difference = benefitScore - riskScore;
  
  const getVerdict = () => {
    if (difference >= 3) {
      return {
        type: "positive",
        icon: ThumbsUp,
        color: "text-benefit",
        bgColor: "bg-benefit-light",
        borderColor: "border-benefit/30",
        title: "Vale a Pena Compartilhar",
        description: "Os benefícios superam significativamente os riscos. Esta tecnologia tem potencial claro de melhorar sua experiência.",
        recommendation: "Recomendamos aceitar o compartilhamento de dados."
      };
    } else if (difference >= 0) {
      return {
        type: "neutral",
        icon: AlertCircle,
        color: "text-warning",
        bgColor: "bg-warning/10",
        borderColor: "border-warning/30",
        title: "Avalie com Cuidado",
        description: "Os benefícios são equilibrados com os riscos. Considere seus valores pessoais e prioridades antes de decidir.",
        recommendation: "Recomendamos avaliar os detalhes antes de decidir."
      };
    } else {
      return {
        type: "negative",
        icon: ThumbsDown,
        color: "text-risk",
        bgColor: "bg-risk-light",
        borderColor: "border-risk/30",
        title: "Considere Não Compartilhar",
        description: "Os riscos identificados superam os benefícios claros. Você pode querer buscar alternativas.",
        recommendation: "Recomendamos cautela ou buscar alternativas."
      };
    }
  };

  const verdict = getVerdict();
  const Icon = verdict.icon;

  return (
    <Card className={`p-6 border-2 ${verdict.borderColor} animate-scale-in`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-3 rounded-xl ${verdict.bgColor} flex-shrink-0`}>
          <Icon className={`h-6 w-6 ${verdict.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{verdict.title}</h3>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {benefitScore > riskScore ? (
                  <Badge className="bg-benefit/10 text-benefit">+{difference} Benefício</Badge>
                ) : riskScore > benefitScore ? (
                  <Badge className="bg-risk/10 text-risk">-{Math.abs(difference)} Risco</Badge>
                ) : (
                  <Badge variant="secondary">Equilibrado</Badge>
                )}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {verdict.description}
          </p>

          <div className={`p-3 rounded-lg ${verdict.bgColor} border ${verdict.borderColor}`}>
            <p className="text-sm font-medium">{verdict.recommendation}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant={verdict.type === "positive" ? "default" : "outline"}
              className="flex-1"
            >
              Aceitar e Prosseguir
            </Button>
            <Button variant="outline" className="flex-1">
              Mais Informações
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};