interface ContainerProps {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return (
    <section className="w-full">
      {children}
    </section>
  )
}
