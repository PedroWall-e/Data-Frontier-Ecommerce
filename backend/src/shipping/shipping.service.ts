import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
    async calculateShipping(zipCode: string, weightKg: number = 0) {
        // Simulação de regras de negócio de frete
        // Em um cenário real, aqui chamaríamos Melhor Envio, Correios ou Intelipost

        const cleanZip = zipCode.replace(/\D/g, '');
        if (cleanZip.length !== 8) {
            throw new Error('CEP Inválido');
        }

        const regionPrefix = parseInt(cleanZip.substring(0, 3));

        let price = 15.00; // Base
        let days = 3;

        // Regras simuladas por região
        if (regionPrefix >= 10 && regionPrefix <= 199) { // SP Capital
            price = 12.90 + (weightKg * 2);
            days = 2;
        } else if (regionPrefix >= 200 && regionPrefix <= 399) { // RJ/MG/ES
            price = 22.50 + (weightKg * 3);
            days = 5;
        } else { // Outras regiões
            price = 35.00 + (weightKg * 5);
            days = 8;
        }

        // Regra de Frete Grátis acima de um valor (isso será validado no OrderService)

        return {
            carrier: 'Data Frontier Logística',
            price,
            deliveryDays: days,
            zipCode: cleanZip
        };
    }
}
