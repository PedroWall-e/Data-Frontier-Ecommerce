import React, { useState } from 'react';
import { ChevronRight, Droplet, Bot, Cpu, Box, Wrench, ArrowRight, BookOpen, Quote, Mail, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LogoDataFrontier from '../components/LogoDataFrontier';

// Importando os mocks e dados
import { trustIndicators, featuredProducts, newArrivals, blogArticles, testimonials } from '../data/mocks';

const Home = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert('Inscrito com sucesso! (Esta é uma demonstração)');
        setEmail('');
    };

    return (
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
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
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
    );
};

export default Home;
