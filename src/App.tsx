import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import ListarOportunidades from './pages/oportunidades/ListarOportunidades'
import Perfil from './pages/perfil/Perfil'
import DetalhesOportunidade from './pages/oportunidades/DetalhesOportunidade'
import FormCandidatura from './pages/oportunidades/FormCandidatura'
import MinhasCandidaturas from './pages/perfil/MinhasCandidaturas'
import FormOportunidade from './pages/oportunidades/FormOportunidade'
import DeletarOportunidade from './pages/oportunidades/DeletarOportunidade'
import ListarPostagens from './pages/comunidade/ListarPostagens'
import FormPostagem from './pages/comunidade/FormPostagem'
import ListarMentorias from './pages/mentorias/ListarMentorias'
import { AuthProvider } from './contexts/AuthContext'

function App() {
 
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            
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
            <Route path="/comunidade" element={<ListarPostagens />} />
            <Route path="/comunidade/postar" element={<FormPostagem />} />
            <Route path="/comunidade/editar/:id" element={<FormPostagem />} />

            {/* Rotas de Mentoria */}
            <Route path="/mentorias" element={<ListarMentorias />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App