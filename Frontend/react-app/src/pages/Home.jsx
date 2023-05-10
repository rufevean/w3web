import '../styles/home.css'
import NavigationBar from '../components/NavigationBar/NavigationBar';
import DocsPng from '../assets/hompage-docs.png'

function Home() {
  return (
    <div className='Home'>
    < NavigationBar />
    <div className='Home-Content'>
        <div className='Home-Content-Title'>DEfi</div>
        <div className='Home-Content-Subtitle'>&quot; Empowering small investments,maximizing returns.&quot;</div>
    </div>
    <div className='Home-Footer'>
        <div className='Home-Footer-Docs'>Docs <img src={DocsPng}/>
        </div>
        <div className='Home-Footer-Contact'>Contact</div>
        <div className='Home-Footer-Governance'>Governance</div>
        </div>
    </div>
  )
}

export default Home;