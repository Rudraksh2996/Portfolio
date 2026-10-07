import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-sm flex flex-col justify-between space-y-4 rounded-3xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className,
      )}
    >
      {header}
      <div className="transition-transform duration-300 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-semibold text-lg text-foreground">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
};
