export interface SiteAnalysis {
  url: string;
  name: string;
  category: string;
  riskScore: number;
  benefitScore: number;
  risks: Array<{
    title: string;
    description: string;
    severity: "high" | "medium" | "low";
  }>;
  benefits: Array<{
    title: string;
    description: string;
  }>;
}

export const mockAnalyses: Record<string, SiteAnalysis> = {
  "replika.ai": {
    url: "replika.ai",
    name: "Replika AI",
    category: "IA Conversacional",
    riskScore: 6,
    benefitScore: 8,
    risks: [
      {
        title: "Coleta de conversas íntimas",
        description: "A plataforma registra todas as suas conversas, incluindo tópicos pessoais e emocionais compartilhados com o chatbot.",
        severity: "high"
      },
      {
        title: "Compartilhamento com terceiros",
        description: "Dados podem ser compartilhados com parceiros para fins de análise e melhoria do serviço.",
        severity: "medium"
      },
      {
        title: "Armazenamento prolongado",
        description: "Os dados são mantidos por período indefinido, mesmo após cancelamento da conta.",
        severity: "medium"
      }
    ],
    benefits: [
      {
        title: "Suporte emocional personalizado",
        description: "Seus dados de conversação treinam o modelo para entender melhor suas necessidades emocionais, oferecendo respostas mais empáticas e relevantes ao longo do tempo."
      },
      {
        title: "Avanço em saúde mental",
        description: "Dados anonimizados ajudam pesquisadores a desenvolver IAs mais eficazes para detecção precoce de sinais de ansiedade e depressão, beneficiando milhões de pessoas."
      },
      {
        title: "Melhoria contínua do serviço",
        description: "Cada interação ajuda a IA a se tornar mais natural e útil para todos os usuários, criando experiências de conversação mais humanas."
      }
    ]
  },
  
  "strava.com": {
    url: "strava.com",
    name: "Strava",
    category: "Fitness e Esportes",
    riskScore: 5,
    benefitScore: 9,
    risks: [
      {
        title: "Rastreamento de localização",
        description: "O app registra sua localização GPS em tempo real durante atividades físicas, revelando padrões de movimento e locais frequentados.",
        severity: "high"
      },
      {
        title: "Exposição de dados públicos",
        description: "Por padrão, suas atividades são visíveis publicamente, incluindo rotas, horários e desempenho.",
        severity: "medium"
      },
      {
        title: "Dados de saúde compartilhados",
        description: "Métricas como frequência cardíaca, calorias e esforço podem ser usadas para análise comercial.",
        severity: "low"
      }
    ],
    benefits: [
      {
        title: "Treinos personalizados com IA",
        description: "Seus dados de trajeto e desempenho alimentam algoritmos que sugerem rotas otimizadas, identificam padrões de melhoria e criam planos de treino adaptados ao seu nível."
      },
      {
        title: "Mapeamento urbano inteligente",
        description: "Dados agregados de milhões de atletas ajudam cidades a identificar áreas que precisam de ciclovias, calçadas melhores e espaços seguros para exercícios."
      },
      {
        title: "Prevenção de lesões",
        description: "IA analisa seus padrões de treino para alertar sobre sobrecarga, sugerir períodos de descanso e prevenir lesões antes que aconteçam."
      },
      {
        title: "Comunidade global conectada",
        description: "Seus dados permitem que você encontre parceiros de treino, participe de desafios e receba motivação de uma comunidade de 100+ milhões de atletas."
      }
    ]
  },
  
  "calm.com": {
    url: "calm.com",
    name: "Calm",
    category: "Meditação e Bem-estar",
    riskScore: 4,
    benefitScore: 7,
    risks: [
      {
        title: "Dados sensíveis de saúde mental",
        description: "Informações sobre humor, padrões de sono, níveis de estresse e histórico de meditação são coletados.",
        severity: "medium"
      },
      {
        title: "Integração com dispositivos",
        description: "Dados de wearables (batimentos cardíacos, sono) são sincronizados e armazenados nos servidores da plataforma.",
        severity: "medium"
      },
      {
        title: "Uso para marketing direcionado",
        description: "Informações podem ser usadas para recomendar produtos pagos e recursos premium.",
        severity: "low"
      }
    ],
    benefits: [
      {
        title: "Programa de meditação personalizado",
        description: "Seus dados de uso permitem que a IA identifique os melhores momentos do dia para você meditar e sugira sessões que combinam com seu estado emocional atual."
      },
      {
        title: "Detecção precoce de burnout",
        description: "Algoritmos analisam padrões de uso, sono e humor para alertar sobre sinais precoces de esgotamento mental, ajudando você a agir antes que se torne grave."
      },
      {
        title: "Pesquisa em neurociência",
        description: "Dados anonimizados contribuem para estudos sobre os efeitos da meditação no cérebro, ajudando a validar cientificamente práticas de mindfulness."
      }
    ]
  }
};

export const getAnalysisForUrl = (url: string): SiteAnalysis | null => {
  const cleanUrl = url.toLowerCase().replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  return mockAnalyses[cleanUrl] || null;
};
