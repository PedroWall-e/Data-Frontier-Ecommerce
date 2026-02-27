import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronRight,
  Star,
  Cpu,
  Droplet,
  Bot,
  Box,
  Wrench,
  ShieldCheck,
  Truck,
  Phone,
  CreditCard,
  ArrowRight,
  Mail,
  BookOpen,
  Quote
} from 'lucide-react';

// Cores Oficiais da Marca
const colors = {
  dark: '#2B2B2B',
  blue: '#3347FF',
  peach: '#FFE3D6',
  rawhide: '#B2624F',
  lightBg: '#F9F8F6',
  white: '#FFFFFF'
};

// Logotipo SVG Oficial
const LogoDataFrontier = ({ className }) => (
  <svg
    viewBox="0 0 837.24402 837.24402"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="clipPath20" clipPathUnits="userSpaceOnUse">
        <path d="M 0,627.933 H 627.933 V 0 H 0 Z" />
      </clipPath>
    </defs>
    <g transform="matrix(1.3333333,0,0,-1.3333333,0,837.244)">
      <g clipPath="url(#clipPath20)">
        <g transform="translate(238.6387,462.4807)">
          <path fill="#3347ff" d="M 0,0 0.001,-0.001 H 0 Z m -22.47,-207.322 0.182,-0.104 c 1.72,-0.988 3.565,-1.778 5.65,-2.412 l 1.892,-0.582 v 170.417 c 0,1.253 0.114,2.542 0.343,3.841 l 0.197,0.92 c 0.302,1.419 0.754,2.844 1.347,4.226 l 0.171,0.395 c 0.198,0.442 0.431,0.874 0.743,1.461 0.125,0.234 0.25,0.468 0.385,0.696 l 0.317,0.489 c 0.686,1.081 1.388,2.022 2.152,2.88 l 0.229,0.306 c 1.528,1.669 3.316,3.109 5.317,4.278 4.699,2.745 10.053,3.789 15.552,2.677 C 5.172,-28.136 1.424,-40.585 1.424,-53.138 V -208.85 l 19.627,11.487 v 144.376 c 0,15.62 8.114,29.877 21.177,37.201 12.729,7.142 27.922,7.1 40.642,-0.119 l 108.994,-61.834 0.291,2.141 c 1.606,11.742 -4.039,23.079 -14.372,28.885 L 92.553,1.159 C 73.16,12.163 50.165,11.877 31.021,0.4 29.69,-0.4 28.349,-1.299 26.852,-2.391 20.059,1.071 12.558,2.63 5.094,2.142 4.267,2.09 3.436,2.006 2.407,1.876 1.653,1.783 0.915,1.653 0.172,1.513 L -0.296,1.435 C -0.951,1.299 -1.611,1.144 -2.401,0.946 L -2.942,0.816 C -3.431,0.686 -3.909,0.535 -4.392,0.385 L -4.969,0.208 -5.588,0.01 c -0.478,-0.156 -0.946,-0.337 -1.486,-0.551 l -3.66,-1.58 c -0.311,-0.15 -0.618,-0.312 -0.92,-0.478 l -0.571,-0.307 -1.196,-0.649 c -0.67,-0.39 -1.336,-0.801 -1.98,-1.227 l -0.307,-0.213 c -0.624,-0.411 -1.227,-0.842 -1.819,-1.284 l -0.328,-0.25 c -8.119,-6.18 -13.686,-15.053 -15.676,-24.996 l -0.115,-1.455 h 0.005 c -0.488,-2.672 -0.733,-5.359 -0.733,-8.01 v -145.078 c 0,-8.831 4.564,-16.976 11.904,-21.254" /></g>
        <g transform="translate(393.5143,262.5085)"><path fill="#3347ff" d="m 0,0 c 7.724,4.522 12.527,12.683 12.527,21.498 -0.011,1.913 -0.25,3.857 -0.728,5.952 l -0.447,1.944 -147.016,-86.144 c -7.813,-4.585 -17.288,-4.107 -24.732,1.252 -3.337,2.407 -5.894,5.749 -7.469,9.752 1.336,-0.094 2.594,-0.141 3.8,-0.141 10.749,0 21.441,2.937 30.916,8.499 L 2.718,42.238 -17.127,53.346 -143.061,-20.464 c -13.02,-7.625 -28.593,-7.693 -41.676,-0.203 -13.083,7.506 -20.891,20.984 -20.891,36.058 v 146.632 l -1.944,-0.666 c -10.572,-3.633 -17.678,-13.592 -17.678,-24.773 V 16.545 c 0,-22.668 11.867,-43.496 30.964,-54.349 1.586,-0.905 3.306,-1.767 5.229,-2.63 1.227,-13.655 8.603,-25.854 19.856,-32.762 6.752,-4.148 14.403,-6.342 22.138,-6.342 7.407,0 14.783,2.027 21.321,5.858 z" /></g>
        <g transform="translate(459.6675,325.7353)"><path fill="#3347ff" d="m 0,0 c -0.104,15.261 -8.093,28.864 -21.368,36.395 l -124.967,70.899 c -7.563,4.294 -16.446,4.673 -23.76,1.05 -0.561,-0.275 -1.112,-0.571 -1.663,-0.894 -1.596,-0.93 -3.114,-2.058 -4.642,-3.456 l -1.486,-1.362 146.839,-83.301 c 7.095,-4.029 11.368,-11.305 11.425,-19.466 0.042,-5.515 -1.856,-10.687 -5.369,-14.772 -5.37,10.983 -13.889,20.001 -24.753,26.166 L -184.852,87.885 V 65.332 L -59.427,-5.811 c 13.062,-7.412 20.921,-20.797 21.025,-35.808 0.104,-15.017 -7.573,-28.516 -20.521,-36.105 l -144.797,-84.844 1.767,-1.321 c 4.99,-3.721 10.916,-5.608 16.867,-5.608 4.886,0 9.793,1.273 14.206,3.846 l 121.875,70.998 c 19.081,11.18 30.381,31.057 30.225,53.169 -0.015,1.84 -0.125,3.779 -0.343,5.889 C -7.028,-27.725 0.104,-14.486 0,0" /></g>
      </g>
    </g>
  </svg>
);

// Mocks de Dados
const featuredProducts = [
  { id: 1, name: 'Kit Robótica Educacional V1', category: 'Robótica', price: 'R$ 499,90', rating: 4.8, icon: Bot, color: colors.blue, bgColor: '#F0F3FF' },
  { id: 2, name: 'Resina 3D Alta Precisão 1KG', category: 'Resinas & Filamentos', price: 'R$ 189,90', rating: 4.9, icon: Droplet, color: colors.rawhide, bgColor: '#FFF5F2' },
  { id: 3, name: 'Placa IoT Satelital Pro', category: 'IoT Satelital', price: 'R$ 850,00', rating: 5.0, icon: Cpu, color: colors.dark, bgColor: '#F3F4F6' },
  { id: 4, name: 'Modelo STL - Engrenagem Motor', category: 'STL Prime', price: 'R$ 29,90', rating: 4.7, icon: Box, color: colors.blue, bgColor: '#F0F3FF' }
];

const newArrivals = [
  { id: 5, name: 'Extrusora de Alta Performance', category: 'Usinagem', price: 'R$ 1.200,00', rating: 4.9, icon: Wrench, color: colors.dark, bgColor: '#F3F4F6' },
  { id: 6, name: 'Sensor de Umidade e Solo IoT', category: 'IoT Satelital', price: 'R$ 145,00', rating: 4.6, icon: Cpu, color: colors.rawhide, bgColor: '#FFF5F2' },
  { id: 7, name: 'Filamento PETG Premium', category: 'Resinas & Filamentos', price: 'R$ 139,90', rating: 4.8, icon: Droplet, color: colors.blue, bgColor: '#F0F3FF' },
  { id: 8, name: 'Braço Robótico Articulado', category: 'Robótica', price: 'R$ 8.500,00', rating: 5.0, icon: Bot, color: colors.dark, bgColor: '#F3F4F6' }
];

const trustIndicators = [
  { icon: Truck, title: 'Frete Expresso', desc: 'Envio rápido para todo o Brasil' },
  { icon: ShieldCheck, title: 'Garantia Estendida', desc: '1 ano de cobertura de fábrica' },
  { icon: Phone, title: 'Suporte Técnico', desc: 'Equipe de engenheiros dedicada' },
  { icon: CreditCard, title: 'Pagamento Seguro', desc: 'Até 12x no cartão ou PIX' }
];

const blogArticles = [
  { id: 1, title: 'Como escolher a resina certa para sua impressora 3D', category: 'Tutoriais', time: '5 min de leitura' },
  { id: 2, title: 'Construindo seu primeiro projeto com IoT Satelital', category: 'Projetos', time: '8 min de leitura' },
  { id: 3, title: 'Usinagem CNC: Vantagens para prototipagem rápida', category: 'Engenharia', time: '6 min de leitura' }
];

const testimonials = [
  { id: 1, name: 'Carlos Mendes', role: 'Engenheiro Chefe', text: 'A qualidade das placas IoT da Data Frontier mudou completamente nossa linha de produção.' },
  { id: 2, name: 'Juliana Silva', role: 'Maker & Professora', text: 'Os kits de robótica são excepcionais. A documentação fornecida facilita muito as aulas.' }
];

// Componente Global de Produto
const ProductCard = ({ product }) => {
  const Icon = product.icon;
  return (
    <div className="bg-white rounded-[2rem] p-4 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
      <div className="relative w-full h-48 rounded-2xl mb-4 flex items-center justify-center transition-colors overflow-hidden" style={{ backgroundColor: product.bgColor }}>
        <Icon className="w-16 h-16 opacity-80 group-hover:scale-110 transition-transform duration-500" style={{ color: product.color }} />
        {/* Badge simulado */}
        {product.rating === 5.0 && (
           <span className="absolute top-3 left-3 bg-[#3347FF] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Top Rate</span>
        )}
      </div>
      
      <div className="px-2 flex flex-col flex-1">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{product.category}</span>
        <h3 className="text-lg font-bold text-[#2B2B2B] leading-tight mb-2 flex-1">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-gray-600">{product.rating}</span>
        </div>
        
        <div className="flex items-end justify-between mt-auto">
          <span className="text-xl font-extrabold text-[#3347FF]">{product.price}</span>
        </div>

        <button className="w-full mt-4 bg-[#F0F2F5] hover:bg-[#3347FF] hover:text-white text-[#2B2B2B] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" /> Adicionar
        </button>
      </div>
    </div>
  );
};

export default function ECommerceStore() {
  const [cartCount, setCartCount] = useState(2);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Inscrito com sucesso! (Esta é uma demonstração)');
    setEmail('');
  };

  return (
    <div className="min-h-screen font-sans bg-[#F9F8F6] text-[#2B2B2B]">
      
      {/* HEADER SUPERIOR (Avisos) */}
      <div className="bg-[#2B2B2B] text-white text-xs font-bold text-center py-2 px-4 tracking-wider">
        FRETE GRÁTIS PARA COMPRAS ACIMA DE R$ 299,00
      </div>

      {/* HEADER PRINCIPAL */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 p-1 bg-white shadow-sm border border-gray-100 rounded-xl">
              <LogoDataFrontier className="w-full h-full" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-extrabold text-xl tracking-tight text-[#2B2B2B] block">data</span>
              <span className="font-extrabold text-xl tracking-tight text-[#2B2B2B] block -mt-1">frontier<span className="text-[#3347FF]">.store</span></span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center bg-[#F0F2F5] rounded-full px-4 py-2 border border-transparent focus-within:border-[#3347FF] focus-within:bg-white focus-within:shadow-sm transition-all">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Pesquisar componentes, resinas, kits..." 
              className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Icons Right */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="md:hidden p-2 text-gray-600 hover:text-[#3347FF]">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#3347FF] flex items-center gap-2 transition-colors">
              <User className="w-6 h-6" />
              <span className="hidden lg:block text-sm font-bold">Entrar</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-[#3347FF] relative transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#3347FF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-[#3347FF]">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categorias Sub-nav */}
        <div className="bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center gap-8 overflow-x-auto whitespace-nowrap py-3">
            {['Hardware IoT', 'Kits Robótica', 'Resinas & Filamentos', 'Modelos STL', 'Usinagem Customizada', 'Cursos Academy'].map((cat) => (
              <a key={cat} href={`#${cat}`} className="text-sm font-bold text-gray-600 hover:text-[#3347FF] transition-colors">
                {cat}
              </a>
            ))}
            <a href="#ofertas" className="text-sm font-bold text-[#B2624F] hover:underline ml-auto flex items-center">
              Ofertas Especiais <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col gap-16">

        {/* HERO BANNER PRINCIPAL */}
        <div className="relative w-full rounded-[2rem] bg-[#3347FF] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 shadow-lg">
          <div className="z-10 max-w-xl text-white">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Lançamento Exclusivo</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              A nova geração de Resinas 3D Industriais
            </h1>
            <p className="text-lg text-white/80 font-medium mb-8">
              Maior precisão, cura ultrarrápida e durabilidade para seus projetos STL Prime de engenharia.
            </p>
            <button className="bg-white text-[#3347FF] hover:bg-[#FFE3D6] hover:text-[#2B2B2B] px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-md flex items-center gap-2">
              Comprar Agora <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-8 md:mt-0 z-10 opacity-90 relative">
             <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/20">
                <Droplet className="w-32 h-32 text-white" />
             </div>
             <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFE3D6] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#B2624F] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>

        {/* INDICADORES DE CONFIANÇA (Trust Signals) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          {trustIndicators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F3FF] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#3347FF]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2B2B2B] leading-tight">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* NAVEGUE POR CATEGORIA */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-[#2B2B2B]">Navegue por Categoria</h2>
            <a href="#todas" className="text-[#3347FF] font-bold text-sm hover:underline flex items-center">
              Ver todas <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:border-[#3347FF]/20 transition-all cursor-pointer group flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F3FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8 text-[#3347FF]" />
              </div>
              <h3 className="font-bold text-[#2B2B2B]">Robótica</h3>
            </div>
            
            <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:border-[#B2624F]/20 transition-all cursor-pointer group flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF5F2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 text-[#B2624F]" />
              </div>
              <h3 className="font-bold text-[#2B2B2B]">Hardware IoT</h3>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE3D6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Box className="w-8 h-8 text-[#2B2B2B]" />
              </div>
              <h3 className="font-bold text-[#2B2B2B]">Modelos STL</h3>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Wrench className="w-8 h-8 text-[#2B2B2B]" />
              </div>
              <h3 className="font-bold text-[#2B2B2B]">Usinagem</h3>
            </div>
          </div>
        </section>

        {/* DESTAQUES DA SEMANA */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-[#2B2B2B]">Destaques da Semana</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* BANNERS PROMOCIONAIS DUPLOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FFE3D6] rounded-[2rem] p-8 flex flex-col items-start justify-center relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="z-10 w-2/3">
              <h3 className="text-2xl font-extrabold text-[#2B2B2B] mb-2">Assinatura STL Prime</h3>
              <p className="text-[#2B2B2B]/80 font-medium mb-6">Acesso ilimitado a centenas de modelos validados para impressão.</p>
              <span className="font-bold text-[#3347FF] flex items-center group-hover:translate-x-2 transition-transform">
                Assine agora <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
            <Box className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white opacity-40 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="bg-[#B2624F] rounded-[2rem] p-8 flex flex-col items-start justify-center relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="z-10 w-2/3">
              <span className="bg-white text-[#B2624F] text-xs font-bold px-2 py-1 rounded mb-3 inline-block">ATÉ 20% OFF</span>
              <h3 className="text-2xl font-extrabold text-white mb-2">Kits Maker IoT</h3>
              <p className="text-white/80 font-medium mb-6">Comece sua jornada na Internet das Coisas com kits completos.</p>
              <span className="font-bold text-white flex items-center group-hover:translate-x-2 transition-transform">
                Ver Kits <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
            <Cpu className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-black opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </section>

        {/* LANÇAMENTOS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-[#2B2B2B]">Novidades no Catálogo</h2>
            <button className="text-[#3347FF] font-bold text-sm hover:underline">Ver tudo</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ACADEMY BANNER */}
        <section className="bg-[#2B2B2B] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-xl">
           <div className="z-10 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Aprenda com a Frontier Academy</h2>
              <p className="text-[#FFE3D6] font-medium text-lg mb-8">
                Adquira nossos cursos e certificações oficiais em IoT, Impressão 3D, Robótica e Usinagem. Projetos práticos direto da indústria.
              </p>
              <button className="bg-[#FFE3D6] text-[#2B2B2B] hover:bg-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                Conhecer Cursos <BookOpen className="w-5 h-5" />
              </button>
           </div>
           
           <div className="hidden md:block z-10 opacity-20">
              <LogoDataFrontier className="w-64 h-64 text-white" />
           </div>
           <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#3347FF]/20 to-transparent pointer-events-none"></div>
        </section>

        {/* TUTORIAIS E BLOG (Comunidade) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-[#2B2B2B]">Comunidade & Projetos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogArticles.map(article => (
              <a key={article.id} href="#" className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group flex flex-col">
                <div className="h-40 bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-white text-[#2B2B2B] text-xs font-bold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-[#3347FF] transition-colors">{article.title}</h3>
                  <div className="mt-auto text-sm text-gray-500 font-medium">
                    {article.time}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* DEPOIMENTOS (Prova Social) */}
        <section className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#2B2B2B]">O que dizem nossos clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(test => (
              <div key={test.id} className="bg-[#F9F8F6] p-8 rounded-3xl relative">
                <Quote className="w-10 h-10 text-[#3347FF] opacity-20 absolute top-6 left-6" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-lg text-gray-700 font-medium italic mb-6">"{test.text}"</p>
                  <div>
                    <h4 className="font-bold text-[#2B2B2B]">{test.name}</h4>
                    <span className="text-sm text-gray-500">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-[#F0F3FF] rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center">
          <Mail className="w-12 h-12 text-[#3347FF] mb-4" />
          <h2 className="text-3xl font-extrabold text-[#2B2B2B] mb-2">Fique por dentro das novidades</h2>
          <p className="text-gray-600 font-medium mb-8 max-w-md">
            Receba lançamentos de hardware, tutoriais exclusivos e promoções direto na sua caixa de entrada.
          </p>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md bg-white rounded-full p-1 shadow-sm border border-gray-200 focus-within:border-[#3347FF] transition-colors">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none px-6 text-gray-700 text-sm"
            />
            <button type="submit" className="bg-[#2B2B2B] hover:bg-[#3347FF] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
              Inscrever
            </button>
          </form>
        </section>

      </main>

      {/* FOOTER COMPLETO */}
      <footer className="bg-white border-t border-gray-200 mt-12 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Marca / Sobre */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 p-1 bg-[#3347FF] rounded-lg">
                <svg viewBox="0 0 837.24402 837.24402" className="w-full h-full fill-white">
                  <g transform="matrix(1.3333333,0,0,-1.3333333,0,837.244)">
                    <g transform="translate(238.6387,462.4807)"><path d="M 0,0 0.001,-0.001 H 0 Z m -22.47,-207.322 0.182,-0.104 c 1.72,-0.988 3.565,-1.778 5.65,-2.412 l 1.892,-0.582 v 170.417 c 0,1.253 0.114,2.542 0.343,3.841 l 0.197,0.92 c 0.302,1.419 0.754,2.844 1.347,4.226 l 0.171,0.395 c 0.198,0.442 0.431,0.874 0.743,1.461 0.125,0.234 0.25,0.468 0.385,0.696 l 0.317,0.489 c 0.686,1.081 1.388,2.022 2.152,2.88 l 0.229,0.306 c 1.528,1.669 3.316,3.109 5.317,4.278 4.699,2.745 10.053,3.789 15.552,2.677 C 5.172,-28.136 1.424,-40.585 1.424,-53.138 V -208.85 l 19.627,11.487 v 144.376 c 0,15.62 8.114,29.877 21.177,37.201 12.729,7.142 27.922,7.1 40.642,-0.119 l 108.994,-61.834 0.291,2.141 c 1.606,11.742 -4.039,23.079 -14.372,28.885 L 92.553,1.159 C 73.16,12.163 50.165,11.877 31.021,0.4 29.69,-0.4 28.349,-1.299 26.852,-2.391 20.059,1.071 12.558,2.63 5.094,2.142 4.267,2.09 3.436,2.006 2.407,1.876 1.653,1.783 0.915,1.653 0.172,1.513 L -0.296,1.435 C -0.951,1.299 -1.611,1.144 -2.401,0.946 L -2.942,0.816 C -3.431,0.686 -3.909,0.535 -4.392,0.385 L -4.969,0.208 -5.588,0.01 c -0.478,-0.156 -0.946,-0.337 -1.486,-0.551 l -3.66,-1.58 c -0.311,-0.15 -0.618,-0.312 -0.92,-0.478 l -0.571,-0.307 -1.196,-0.649 c -0.67,-0.39 -1.336,-0.801 -1.98,-1.227 l -0.307,-0.213 c -0.624,-0.411 -1.227,-0.842 -1.819,-1.284 l -0.328,-0.25 c -8.119,-6.18 -13.686,-15.053 -15.676,-24.996 l -0.115,-1.455 h 0.005 c -0.488,-2.672 -0.733,-5.359 -0.733,-8.01 v -145.078 c 0,-8.831 4.564,-16.976 11.904,-21.254" /></g>
                    <g transform="translate(393.5143,262.5085)"><path d="m 0,0 c 7.724,4.522 12.527,12.683 12.527,21.498 -0.011,1.913 -0.25,3.857 -0.728,5.952 l -0.447,1.944 -147.016,-86.144 c -7.813,-4.585 -17.288,-4.107 -24.732,1.252 -3.337,2.407 -5.894,5.749 -7.469,9.752 1.336,-0.094 2.594,-0.141 3.8,-0.141 10.749,0 21.441,2.937 30.916,8.499 L 2.718,42.238 -17.127,53.346 -143.061,-20.464 c -13.02,-7.625 -28.593,-7.693 -41.676,-0.203 -13.083,7.506 -20.891,20.984 -20.891,36.058 v 146.632 l -1.944,-0.666 c -10.572,-3.633 -17.678,-13.592 -17.678,-24.773 V 16.545 c 0,-22.668 11.867,-43.496 30.964,-54.349 1.586,-0.905 3.306,-1.767 5.229,-2.63 1.227,-13.655 8.603,-25.854 19.856,-32.762 6.752,-4.148 14.403,-6.342 22.138,-6.342 7.407,0 14.783,2.027 21.321,5.858 z" /></g>
                    <g transform="translate(459.6675,325.7353)"><path d="m 0,0 c -0.104,15.261 -8.093,28.864 -21.368,36.395 l -124.967,70.899 c -7.563,4.294 -16.446,4.673 -23.76,1.05 -0.561,-0.275 -1.112,-0.571 -1.663,-0.894 -1.596,-0.93 -3.114,-2.058 -4.642,-3.456 l -1.486,-1.362 146.839,-83.301 c 7.095,-4.029 11.368,-11.305 11.425,-19.466 0.042,-5.515 -1.856,-10.687 -5.369,-14.772 -5.37,10.983 -13.889,20.001 -24.753,26.166 L -184.852,87.885 V 65.332 L -59.427,-5.811 c 13.062,-7.412 20.921,-20.797 21.025,-35.808 0.104,-15.017 -7.573,-28.516 -20.521,-36.105 l -144.797,-84.844 1.767,-1.321 c 4.99,-3.721 10.916,-5.608 16.867,-5.608 4.886,0 9.793,1.273 14.206,3.846 l 121.875,70.998 c 19.081,11.18 30.381,31.057 30.225,53.169 -0.015,1.84 -0.125,3.779 -0.343,5.889 C -7.028,-27.725 0.104,-14.486 0,0" /></g>
                  </g>
                </svg>
              </div>
              <span className="font-extrabold text-xl text-[#2B2B2B]">data frontier</span>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">Projetos completos que integram uma metodologia do começo ao fim. Da criação, perpassando pelo sistema que executa até o fornecimento da matéria-prima.</p>
          </div>

          {/* Links 1 - Loja */}
          <div>
            <h4 className="font-bold text-[#2B2B2B] mb-4">A Loja</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">IoT Satelital</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Resinas e Filamentos</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Kits de Robótica</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Modelos STL Prime</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Usinagem Sob Medida</a></li>
            </ul>
          </div>

          {/* Links 2 - Ajuda */}
          <div>
            <h4 className="font-bold text-[#2B2B2B] mb-4">Ajuda & Suporte</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Acompanhar Pedido</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Frete e Entregas</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#" className="hover:text-[#3347FF] transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Links 3 - Contato */}
          <div>
            <h4 className="font-bold text-[#2B2B2B] mb-4">Contato</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500 font-medium">
              <li>Rua da Bahia, 504 - Sala 301</li>
              <li>Belo Horizonte, MG - Brasil</li>
              <li>CEP: 30160-015</li>
              <li className="mt-2 text-[#3347FF] font-bold">contato@datafrontier.com.br</li>
              <li className="text-[#3347FF] font-bold">+55 31 97528-0637</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 font-medium">© {new Date().getFullYear()} Data Frontier. Tecnologia única como você. CNPJ: 37.227.651/0001-29</p>
          <div className="flex items-center gap-4">
             {/* Payment Badges Simples */}
             <span className="h-6 px-2 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[10px] font-extrabold text-gray-600">PIX</span>
             <span className="h-6 px-2 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[10px] font-extrabold text-gray-600">BOLETO</span>
             <span className="h-6 px-2 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[10px] font-extrabold text-gray-600">VISA / MC</span>
          </div>
        </div>
      </footer>

    </div>
  );
}