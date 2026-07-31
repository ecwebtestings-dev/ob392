export function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs  uppercase tracking-wider text-gray-500">
      {children}
    </th>
  );
}

export function Td({ children, className = "", ...rest }) {
  return (
    <td className={`px-3 py-2 text-gray-700 ${className}`} {...rest}>
      {children}
    </td>
  );
}