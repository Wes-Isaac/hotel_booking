interface LoaderProps {
  show: boolean
}

const Loader = ({ show }: LoaderProps) => {
return show ? <div className="loader m-4"></div> : null 
}

export default Loader