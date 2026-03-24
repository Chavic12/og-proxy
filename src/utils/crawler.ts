import { CRAWLER_AGENTS } from '../config/crawlers';

export function isCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  return CRAWLER_AGENTS.some(agent => userAgent.toLowerCase().includes(agent.toLowerCase()));
}
