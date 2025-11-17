import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface BalanceItem {
  title: string;
  description: string;
  severity?: "high" | "medium" | "low";
}

interface BalanceCardProps {
  type: "risk" | "benefit";
  items: BalanceItem[];
  score: number;
}

export const BalanceCard = ({ type, items, score }: BalanceCardProps) => {
  const isRisk = type === "risk";
  
  const config = {
    risk: {
      title: "Riscos Identificados",
      icon: AlertTriangle,
      colorClass: "text-risk",
      bgClass: "bg-risk-light",
      borderClass: "border-risk/20",
      scoreLabel: "Nível de Risco"
    },
    benefit: {
      title: "Benefícios do Compartilhamento",
      icon: CheckCircle2,
      colorClass: "text-benefit",
      bgClass: "bg-benefit-light",
      borderClass: "border-benefit/20",
      scoreLabel: "Nível de Benefício"
    }
  };
  
  const { title, icon: Icon, colorClass, bgClass, borderClass, scoreLabel } = config[type];
  
  const getSeverityColor = (severity?: string) => {
    if (!severity) return "bg-muted";
    const colors = {
      high: "bg-risk",
      medium: "bg-warning",
      low: "bg-muted"
    };
    return colors[severity as keyof typeof colors];
  };

  return (
    <Card className={`p-6 space-y-4 border-2 ${borderClass} hover:shadow-lg transition-all duration-300 animate-fade-in`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgClass}`}>
            <Icon className={`h-5 w-5 ${colorClass}`} />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        
        {/* Score Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{scoreLabel}:</span>
          <Badge variant="secondary" className={`${isRisk ? 'bg-risk/10 text-risk' : 'bg-benefit/10 text-benefit'} font-bold`}>
            {score}/10
          </Badge>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3 mt-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {item.severity ? (
                <div className={`h-2 w-2 rounded-full ${getSeverityColor(item.severity)}`} />
              ) : (
                <Info className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhum {isRisk ? 'risco' : 'benefício'} identificado</p>
        </div>
      )}
    </Card>
  );
};
