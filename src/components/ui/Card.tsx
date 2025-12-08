import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

interface CardProps extends HTMLMotionProps<"div"> {
    gradient?: boolean;
}

export function Card({ className, children, gradient = false, ...props }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-xl",
                gradient
                    ? "bg-gradient-to-br from-white/10 to-white/5"
                    : "bg-zinc-900/60",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
