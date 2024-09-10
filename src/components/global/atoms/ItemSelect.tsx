import { ReactNode } from "react"

interface ContainerProps {
  label: ReactNode
}

const Item = ({ label }: ContainerProps) => {
  return (
    <div className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block">
      {label}
    </div>
  )
}

export default Item