import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

                {/* Marca / Sobre */}
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 p-1 bg-[#3347FF] rounded-lg">
                            <svg viewBox="0 0 837.24402 837.24402" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
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
    );
};

export default Footer;
