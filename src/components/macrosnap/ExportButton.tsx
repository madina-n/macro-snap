"use client";

import type { FoodItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  logs: FoodItem[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ logs }) => {
  const { toast } = useToast();

  const exportToCSV = () => {
    if (logs.length === 0) {
      toast({
        title: "No Data",
        description: "There's no data to export.",
        variant: "default",
      });
      return;
    }

    const headers = ['Date', 'Time', 'Name', 'Calories (kcal)', 'Protein (g)', 'Carbs (g)', 'Fat (g)'];
    const rows = logs.map(log => {
      const dateObj = new Date(log.timestamp);
      return [
        format(dateObj, 'yyyy-MM-dd'),
        format(dateObj, 'HH:mm:ss'),
        `"${log.name.replace(/"/g, '""')}"`, // Handle commas and quotes in name
        log.calories.toFixed(1),
        log.protein.toFixed(1),
        log.carbs.toFixed(1),
        log.fat.toFixed(1),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) { // Check for browser support
      const url = URL.createObjectURL(blob);
      const filename = `macrosnap_log_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`;
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({
        title: "Export Successful",
        description: `${filename} has been downloaded.`,
      });
    } else {
       toast({
        title: "Export Failed",
        description: "Your browser does not support this feature.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={exportToCSV} variant="outline" className="w-full sm:w-auto">
      <Download className="mr-2 h-4 w-4" /> Export Log to CSV
    </Button>
  );
};

export default ExportButton;
