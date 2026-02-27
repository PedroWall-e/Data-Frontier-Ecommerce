import { Bot, Droplet, Cpu, Box, Wrench, Truck, ShieldCheck, Phone, CreditCard } from 'lucide-react';

export const colors = {
    dark: '#2B2B2B',
    blue: '#3347FF',
    peach: '#FFE3D6',
    rawhide: '#B2624F',
    lightBg: '#F9F8F6',
    white: '#FFFFFF'
};

export const featuredProducts = [
    { id: 1, name: 'Kit Robótica Educacional V1', category: 'Robótica', price: 'R$ 499,90', rating: 4.8, icon: Bot, color: colors.blue, bgColor: '#F0F3FF' },
    { id: 2, name: 'Resina 3D Alta Precisão 1KG', category: 'Resinas & Filamentos', price: 'R$ 189,90', rating: 4.9, icon: Droplet, color: colors.rawhide, bgColor: '#FFF5F2' },
    { id: 3, name: 'Placa IoT Satelital Pro', category: 'IoT Satelital', price: 'R$ 850,00', rating: 5.0, icon: Cpu, color: colors.dark, bgColor: '#F3F4F6' },
    { id: 4, name: 'Modelo STL - Engrenagem Motor', category: 'STL Prime', price: 'R$ 29,90', rating: 4.7, icon: Box, color: colors.blue, bgColor: '#F0F3FF' }
];

export const newArrivals = [
    { id: 5, name: 'Extrusora de Alta Performance', category: 'Usinagem', price: 'R$ 1.200,00', rating: 4.9, icon: Wrench, color: colors.dark, bgColor: '#F3F4F6' },
    { id: 6, name: 'Sensor de Umidade e Solo IoT', category: 'IoT Satelital', price: 'R$ 145,00', rating: 4.6, icon: Cpu, color: colors.rawhide, bgColor: '#FFF5F2' },
    { id: 7, name: 'Filamento PETG Premium', category: 'Resinas & Filamentos', price: 'R$ 139,90', rating: 4.8, icon: Droplet, color: colors.blue, bgColor: '#F0F3FF' },
    { id: 8, name: 'Braço Robótico Articulado', category: 'Robótica', price: 'R$ 8.500,00', rating: 5.0, icon: Bot, color: colors.dark, bgColor: '#F3F4F6' }
];

export const trustIndicators = [
    { icon: Truck, title: 'Frete Expresso', desc: 'Envio rápido para todo o Brasil' },
    { icon: ShieldCheck, title: 'Garantia Estendida', desc: '1 ano de cobertura de fábrica' },
    { icon: Phone, title: 'Suporte Técnico', desc: 'Equipe de engenheiros dedicada' },
    { icon: CreditCard, title: 'Pagamento Seguro', desc: 'Até 12x no cartão ou PIX' }
];

export const blogArticles = [
    { id: 1, title: 'Como escolher a resina certa para sua impressora 3D', category: 'Tutoriais', time: '5 min de leitura' },
    { id: 2, title: 'Construindo seu primeiro projeto com IoT Satelital', category: 'Projetos', time: '8 min de leitura' },
    { id: 3, title: 'Usinagem CNC: Vantagens para prototipagem rápida', category: 'Engenharia', time: '6 min de leitura' }
];

export const testimonials = [
    { id: 1, name: 'Carlos Mendes', role: 'Engenheiro Chefe', text: 'A qualidade das placas IoT da Data Frontier mudou completamente nossa linha de produção.' },
    { id: 2, name: 'Juliana Silva', role: 'Maker & Professora', text: 'Os kits de robótica são excepcionais. A documentação fornecida facilita muito as aulas.' }
];
