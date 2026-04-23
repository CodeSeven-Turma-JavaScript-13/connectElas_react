import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Perfil from './pages/perfil/Perfil'

import FormCandidatura from './components/oportunidades/formcandidatura/FormCandidatura'
import MinhasCandidaturas from './pages/perfil/MinhasCandidaturas'
import FormOportunidade from './components/oportunidades/formoportunidade/FormOportunidade'
import DeletarOportunidade from './components/oportunidades/deletaroportunidade/DeletarOportunidade'



import { AuthProvider } from './contexts/AuthContext'
import ListarMentorias from './pages/mentorias/ListarMentorias'
import SobreNos from './pages/sobre/SobreNos'
import Contato from './pages/contato/Contato'
import FormPostagem from './components/comunidade/postagem/formpostagem/FormPostagem'
import ListarTemas from './components/comunidade/tema/listartemas/ListarTemas'
import FormTema from './components/comunidade/tema/formtema/FormTema'
import DeletarTema from './components/comunidade/tema/deletartema/DeletarTema'
import ListarOportunidades from './components/oportunidades/listaroportunidades/ListarOportunidades'
import DetalhesOportunidade from './components/oportunidades/detalhesoportunidade/DetalhesOportunidade'
import CadastroRecrutador from './pages/cadastro/CadastroRecrutador'
import Comunidade from './pages/comunidade/Comunidade'
import { ToastContainer } from 'react-toastify'

function App() {
 
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-recrutador" element={<CadastroRecrutador />} />
            
            {/* Rotas de Vagas */}
            <Route path="/oportunidades" element={<ListarOportunidades />} />
            <Route path="/oportunidades/:id" element={<DetalhesOportunidade />} />
            <Route path="/oportunidades/:id/candidatar" element={<FormCandidatura />} />
            <Route path="/anunciar-vaga" element={<FormOportunidade />} />
            <Route path="/editar-vaga/:id" element={<FormOportunidade />} />
            <Route path="/deletar-vaga/:id" element={<DeletarOportunidade />} />

            {/* Rotas de Perfil */}
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil/candidaturas" element={<MinhasCandidaturas />} />

            {/* Rotas da Comunidade */}
            <Route path="/comunidade" element={<Comunidade />} />
            <Route path="/comunidade/postar" element={<FormPostagem />} />
            <Route path="/comunidade/editar/:id" element={<FormPostagem />} />
            <Route path="/temas" element={<ListarTemas />} />
            <Route path="/cadastrar-tema" element={<FormTema />} />
            <Route path="/editar-tema/:id" element={<FormTema />} />
            <Route path="/deletar-tema/:id" element={<DeletarTema />} />

            {/* Rotas de Mentoria */}
            <Route path="/mentorias" element={<ListarMentorias />} />

            {/* Rotas Institucionais */}
            <Route path="/sobre" element={<SobreNos />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App