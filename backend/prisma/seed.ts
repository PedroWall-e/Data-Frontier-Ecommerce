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
            product: { name: 'Placa IoT Satelital Pro', slug: 'placa-iot-satelital-pro', description: 'Placa de desenvolvimento com conectividade satelital integrada. Compatível com LoRa, MQTT e nuvem.', shortDesc: 'Conectividade satelital para projetos IoT de alto alcance', categoryId: iotCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['iot', 'satelite', 'lora'], isActive: true },
            skus: [
                { sku: 'PLT-IOT-STD', price: 850.00, comparePrice: 999.00, stock: 50, attributes: { Versão: 'Standard' } },
                { sku: 'PLT-IOT-ENT', price: 1250.00, stock: 20, attributes: { Versão: 'Enterprise' } },
            ],
        },
        {
            product: { name: 'Kit Robótica Educacional V2', slug: 'kit-robotica-educacional-v2', description: 'Kit completo para aprender robótica do zero. 20 missões práticas com microcontrolador e sensores.', shortDesc: 'Aprenda robótica do zero com projetos práticos', categoryId: roboticsCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['robotica', 'educacional', 'kit'], isActive: true },
            skus: [{ sku: 'KIT-ROB-V2', price: 499.90, comparePrice: 599.90, stock: 35 }],
        },
        {
            product: { name: 'Resina 3D Alta Precisão UV 1KG', slug: 'resina-3d-uv-1kg', description: 'Resina fotopolimérica de alta precisão para impressoras SLA/MSLA. Cura ultrarrápida e acabamento premium.', shortDesc: 'Resina com cura rápida e acabamento premium', categoryId: resinsCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['resina', 'impressao3d', 'sla'], isActive: true },
            skus: [
                { sku: 'RES-UV-CLA', price: 189.90, stock: 120, attributes: { Cor: 'Transparente' } },
                { sku: 'RES-UV-GRY', price: 189.90, stock: 80, attributes: { Cor: 'Cinza' } },
                { sku: 'RES-UV-BLK', price: 189.90, stock: 60, attributes: { Cor: 'Preto' } },
            ],
        },
        {
            product: { name: 'Filamento PETG Premium 1.75mm', slug: 'filamento-petg-175mm', description: 'Filamento PETG com excelente resistência mecânica e química. Ideal para peças funcionais e protótipos.', shortDesc: 'Alta resistência para peças funcionais', categoryId: resinsCategory.id, brandId: dfBrand.id, isFeatured: false, tags: ['filamento', 'petg', 'fdm'], isActive: true },
            skus: [
                { sku: 'FIL-PETG-1KG-WHT', price: 139.90, comparePrice: 159.90, stock: 200, attributes: { Cor: 'Branco', Peso: '1KG' } },
                { sku: 'FIL-PETG-3KG-WHT', price: 389.90, stock: 80, attributes: { Cor: 'Branco', Peso: '3KG' } },
                { sku: 'FIL-PETG-1KG-BLK', price: 139.90, stock: 150, attributes: { Cor: 'Preto', Peso: '1KG' } },
            ],
        },
        {
            product: { name: 'Braço Robótico Articulado 6-DOF', slug: 'braco-robotico-6dof', description: 'Braço robótico industrial com 6 graus de liberdade. Controle via ROS ou software próprio. Ideal para automação e pesquisa.', shortDesc: 'Automação industrial e pesquisa avançada', categoryId: roboticsCategory.id, brandId: dfBrand.id, isFeatured: true, tags: ['robotica', 'industrial', 'automacao'], isActive: true },
            skus: [{ sku: 'BRC-ROB-6DOF', price: 8500.00, comparePrice: 9500.00, stock: 8 }],
        },
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
