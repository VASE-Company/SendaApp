export type AllowedDomain = 'jw.org' | 'wol.jw.org';

export interface ChatCitation {
  domain: AllowedDomain;
  title: string;
  excerpt: string;
  url: `https://${string}`;
}

export interface ChatResponse {
  message: string;
  nextAction: string;
  citation: ChatCitation;
}

const DOMAIN_WHITELIST: AllowedDomain[] = ['jw.org', 'wol.jw.org'];

export function assertAllowedSource(url: string): AllowedDomain | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '') as AllowedDomain;
    return DOMAIN_WHITELIST.includes(host) ? host : null;
  } catch {
    return null;
  }
}

export function buildLimitedResponse(): ChatResponse {
  return {
    message: 'No encontré una referencia verificable en jw.org/wol.jw.org para esta consulta.',
    nextAction: 'Probá reformular la consulta en términos bíblicos concretos.',
    citation: {
      domain: 'jw.org',
      title: 'Límite del sistema de fuentes',
      excerpt: 'El asistente responde solo con fuentes jw.org / wol.jw.org.',
      url: 'https://www.jw.org/'
    }
  };
}

export function getMockChatResponse(userPrompt: string): ChatResponse {
  if (!userPrompt.toLowerCase().includes('tent')) return buildLimitedResponse();
  const citation: ChatCitation = {
    domain: 'jw.org',
    title: 'Cómo resistir la tentación',
    excerpt: 'Ore, aléjese de la situación de riesgo y busque ayuda espiritual inmediatamente.',
    url: 'https://www.jw.org/es/'
  };
  if (!assertAllowedSource(citation.url)) return buildLimitedResponse();
  return {
    message: 'Respirá profundo, alejate del disparador y ejecutá una acción limpia inmediata.',
    nextAction: 'Abrí Crisis Mode y contactá a tu mentor en menos de 2 minutos.',
    citation
  };
}
