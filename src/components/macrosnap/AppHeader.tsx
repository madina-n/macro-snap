import { Utensils } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground p-5 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex items-center">
        <Utensils className="h-9 w-9 mr-3" />
        <h1 className="text-4xl font-bold tracking-tight">MacroSnap</h1>
      </div>
    </header>
  );
};
export default AppHeader;
