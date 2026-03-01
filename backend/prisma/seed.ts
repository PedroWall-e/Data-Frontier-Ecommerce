import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');

    // ─── CATEGORIAS ───────────────────────────────────────────────────────────
    const iotCategory = await (prisma as any).category.upsert({
        where: { slug: 'hardware-iot' },
        update: {},
        create: { name: 'Hardware IoT', slug: 'hardware-iot', description: 'Placas, sensores e módulos para IoT', isActive: true },
    });

    const roboticsCategory = await (prisma as any).category.upsert({
        where: { slug: 'kits-robotica' },
        update: {},
        create: { name: 'Kits Robótica', slug: 'kits-robotica', description: 'Kits de robótica educacional e industrial', isActive: true },
    });

    const resinsCategory = await (prisma as any).category.upsert({
        where: { slug: 'resinas-filamentos' },
        update: {},
        create: { name: 'Resinas & Filamentos', slug: 'resinas-filamentos', description: 'Materiais de impressão 3D de alta qualidade', isActive: true },
    });

    await (prisma as any).category.upsert({
        where: { slug: 'modelos-stl' },
        update: {},
        create: { name: 'Modelos STL Prime', slug: 'modelos-stl', description: 'Modelos digitais validados para impressão 3D', isActive: true },
    });

    await (prisma as any).category.upsert({
        where: { slug: 'usinagem-customizada' },
        update: {},
        create: { name: 'Usinagem Customizada', slug: 'usinagem-customizada', description: 'Peças usinadas sob medida', isActive: true },
    });

    console.log('✅ Categorias criadas');

    // ─── MARCAS ───────────────────────────────────────────────────────────────
    const dfBrand = await (prisma as any).brand.upsert({
        where: { slug: 'data-frontier' },
        update: {},
        create: { name: 'Data Frontier', slug: 'data-frontier', isActive: true },
    });

    console.log('✅ Marcas criadas');

    // ─── PRODUTOS + SKUs ──────────────────────────────────────────────────────
    const productsData = [
        {
            product: { name: 'Placa Arduino Uno R3 Compatível', slug: 'arduino-uno-r3', description: 'Placa microcontroladora baseada no ATmega328P. Ideal para iniciantes em robótica e eletrônica.', shortDesc: 'O clássico para iniciar no mundo maker', categoryId: iotCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['arduino', 'maker', 'educacional'], isActive: true },
            skus: [{ sku: 'ARD-UNO-R3', price: 54.90, comparePrice: 65.00, stock: 150 }],
        },
        {
            product: { name: 'Módulo WiFi ESP8266 NodeMCU', slug: 'esp8266-nodemcu', description: 'Placa de desenvolvimento IoT com chip WiFi integrado. Perfeita para automação residencial e integração com Alexa.', shortDesc: 'Automação WiFi de baixo custo', categoryId: iotCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['iot', 'wifi', 'esp8266'], isActive: true },
            skus: [{ sku: 'MOD-ESP-8266', price: 35.90, stock: 200 }],
        },
        {
            product: { name: 'Raspberry Pi 4 Model B (4GB RAM)', slug: 'raspberry-pi-4-4gb', description: 'Minicomputador completo para rodar servidores locais, Home Assistant, RetroPie e laboratórios avançados.', shortDesc: 'Minicomputador de alto desempenho', categoryId: iotCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['raspberry', 'linux', 'server'], isActive: true },
            skus: [{ sku: 'RPI-4-4GB', price: 650.00, comparePrice: 720.00, stock: 15 }],
        },
        {
            product: { name: 'Resina 3D Lavável em Água - Cinza', slug: 'resina-lavavel-cinza', description: 'Resina para impressoras SLA que não necessita de álcool isopropílico para limpeza. Limpe suas peças apenas com água!', shortDesc: 'Limpeza prática direto na água', categoryId: resinsCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['resina', 'lavavel', '3d'], isActive: true },
            skus: [{ sku: 'RES-WASH-GRY-1KG', price: 189.90, comparePrice: 210.00, stock: 50, attributes: { Peso: '1KG' } }],
        },
        {
            product: { name: 'Resina 3D Tipo ABS (Alta Resistência)', slug: 'resina-abs-like', description: 'Resina com propriedades mecânicas similares ao plástico ABS, ideal para peças funcionais e engrenagens.', shortDesc: 'Alta resistência para peças mecânicas', categoryId: resinsCategory.id, brandId: dfBrand.id, isFeatured: false, tags: ['resina', 'abs', 'engenharia'], isActive: true },
            skus: [
                { sku: 'RES-ABS-BLK-1KG', price: 215.00, stock: 30, attributes: { Cor: 'Preto', Peso: '1KG' } },
                { sku: 'RES-ABS-WHT-1KG', price: 215.00, stock: 25, attributes: { Cor: 'Branco', Peso: '1KG' } }
            ],
        },
        {
            product: { name: 'Modelo STL - Drone Quadricóptero FPV', slug: 'stl-drone-fpv', description: 'Arquivos STL otimizados para impressão 3D de um frame de drone de corrida tamanho 5 polegadas. Testado para alta durabilidade.', shortDesc: 'Frame de drone para impressão 3D', categoryId: 4, brandId: dfBrand.id, isFeatured: false, tags: ['stl', 'drone', 'fpv'], isActive: true },
            skus: [{ sku: 'STL-DRN-FPV-01', price: 29.90, stock: 9999 }],
        },
        {
            product: { name: 'Kit Robótica Braço Hidráulico (MDF)', slug: 'kit-braco-hidraulico-mdf', description: 'Kit educacional Cortado a Laser em MDF. Ensina princípios de hidráulica (seringas) para crianças.', shortDesc: 'Aprenda hidráulica brincando', categoryId: roboticsCategory.id, brandId: dfBrand.id, isFeatured: false, tags: ['kit', 'educacional', 'mdf'], isActive: true },
            skus: [{ sku: 'KIT-MDF-HIDRO', price: 79.90, stock: 60 }],
        }
    ];

    for (const { product, skus } of productsData) {
        const created = await (prisma as any).product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });

        for (const sku of skus) {
            await (prisma as any).productSku.upsert({
                where: { sku: sku.sku },
                update: {},
                create: { productId: created.id, isActive: true, reservedStock: 0, ...sku },
            });
        }
    }

    console.log('✅ Produtos e SKUs criados');

    // ─── CUPONS ───────────────────────────────────────────────────────────────
    await (prisma as any).coupon.upsert({
        where: { code: 'DATAFRONTIER10' },
        update: {},
        create: { code: 'DATAFRONTIER10', type: 'PERCENTAGE', value: 10, minOrderValue: 200, maxUses: 100, isActive: true },
    });

    await (prisma as any).coupon.upsert({
        where: { code: 'FRETEGRATIS' },
        update: {},
        create: { code: 'FRETEGRATIS', type: 'FREE_SHIPPING', value: 0, minOrderValue: 150, isActive: true },
    });

    console.log('✅ Cupons criados');
    console.log('\n✨ Seed concluído com sucesso!');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
