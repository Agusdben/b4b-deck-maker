interface Props {
  children: React.ReactNode
}

const SectionTitle: React.FC<Props> = ({ children }) => {
  return <h2 className="text-3xl font-bold">{children}</h2>
}
export default SectionTitle
