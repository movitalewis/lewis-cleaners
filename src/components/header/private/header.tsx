import Nav from './nav.tsx'
import HeaderLogo from './headerLogo.tsx'

function Header() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <div className='main-container'>
            <HeaderLogo></HeaderLogo>
            <Nav></Nav>
        </div>
      </header>
    </>
  )
}

export default Header