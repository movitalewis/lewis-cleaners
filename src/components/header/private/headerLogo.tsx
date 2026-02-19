import reactLogo from '../../../assets/logo.png'
function HeaderLogo() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
    </>
  )
}

export default HeaderLogo