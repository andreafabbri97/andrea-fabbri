// Opens and closes with a short height animation (grid rows 0fr → 1fr). When closed its content is
// inert: not reachable with Tab, not read by screen readers.
export default function Collapsible({ open, id, children, className = '' }) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} ${className}`}
    >
      <div className="overflow-hidden min-h-0">{children}</div>
    </div>
  )
}
