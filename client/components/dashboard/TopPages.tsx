import { TopPage } from '@shared/analytics';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface TopPagesProps {
  data: TopPage[];
}

export function TopPages({ data }: TopPagesProps) {
  const maxViews = Math.max(...data.map(page => page.views));

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Pages</h3>
        <TrendingUp className="w-5 h-5 text-primary" />
      </div>
      
      <div className="space-y-3">
        {data.map((page, index) => {
          const percentage = (page.views / maxViews) * 100;
          
          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{page.path}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold">{page.views.toLocaleString()}</span>
              </div>
              
              <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full transition-all duration-1000 ease-out shimmer"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
