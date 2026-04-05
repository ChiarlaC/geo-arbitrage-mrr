interface Method {
  name: string;
  successRate: string;
  status: 'works' | 'blocked' | 'risky';
  description: string;
}

interface MethodComparisonTableProps {
  methods: Method[];
}

export default function MethodComparisonTable({ methods }: MethodComparisonTableProps) {
  const getStatusBadge = (status: Method['status']) => {
    switch (status) {
      case 'works':
        return <span className="px-2 py-1 text-xs font-bold uppercase bg-green-100 text-green-800 rounded">Works</span>;
      case 'blocked':
        return <span className="px-2 py-1 text-xs font-bold uppercase bg-red-100 text-red-800 rounded">Blocked</span>;
      case 'risky':
        return <span className="px-2 py-1 text-xs font-bold uppercase bg-amber-100 text-amber-800 rounded">Risky</span>;
    }
  };

  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-900">
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
              Method
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
              Success Rate
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {methods.map((method, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                {method.name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {method.successRate}
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-2">
                  {getStatusBadge(method.status)}
                  <span className="text-xs text-gray-600">{method.description}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
