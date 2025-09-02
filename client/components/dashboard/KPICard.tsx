import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  className 
}: KPICardProps) {
  const changeColor = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-muted-foreground"
  }[changeType];

  const changeIcon = {
    positive: "↗",
    negative: "↘",
    neutral: "→"
  }[changeType];

  return (
    <div className={cn(
      "glass glass-hover rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:glow-blue group",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <p className={cn("text-sm font-medium flex items-center gap-1", changeColor)}>
            <span className="text-lg">{changeIcon}</span>
            {change}% vs last period
          </p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
