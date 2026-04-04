import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-neutral-600 mb-6">
      <ol className="flex items-center space-x-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="text-neutral-400 mx-3">/</span>}
            {index === items.length - 1 ? (
              <span className="text-primary-500 font-medium">{item.label}</span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-primary-500 transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
