import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ScreenLayoutProps {
    children: ReactNode;
    className?: string;
}

export function ScreenLayout({ children, className }: ScreenLayoutProps) {
    return (
        <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col relative overflow-hidden font-sans">
            {/* Background Ambience */}
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <main className={cn(
                "flex-1 flex flex-col w-full p-6 relative z-10",
                className
            )}>
                {children}
            </main>
        </div>
    );
}
