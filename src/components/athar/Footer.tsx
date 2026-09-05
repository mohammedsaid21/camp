import { FOOTER_COLUMNS } from "./data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-8 pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-8 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="font-display text-2xl leading-none">
              أثر<span className="text-accent">.</span>
            </div>
            <p className="mt-2 max-w-[34ch] text-sm text-muted-foreground">
              منصّة بتوثّق شغلنا بمخيم نسائم الرحمة.
            </p>
          </div>
          <div className="flex flex-wrap gap-10">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.h}>
                <h4 className="mb-2 text-sm font-semibold">{col.h}</h4>
                <ul className="flex flex-col gap-1.5">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          نلتزم بحماية كرامة من نوثّق قصصهم. لا يُنشر اسم أو صورة دون موافقة.
        </p>
      </div>
    </footer>
  );
}
