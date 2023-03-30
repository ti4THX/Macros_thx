import { BaseModel } from "src/entities/base/base.model";
import { EventReleaseSSWModel } from "./EventReleaseSSW.model";
import { UnitFromReleaseSSWModel } from "./UnitFromReleaseSSW.model";

export class ReleaseSSWModel extends BaseModel {
    unidade_lancamento: UnitFromReleaseSSWModel;
    evento: EventReleaseSSWModel;
    cnpj_cpf: string;
    serie: string;
    numero_documento: string;
    data_emissao: Date;
    data_entrada: Date;
    valor: number;
    historico: string;
    valor_parcela: number;
    data_vencimento: Date;
    data_pagamento: Date;
    lancado: boolean;
    erro: string;
    // usuario              user               @relation(fields: [userId], references: [id])
    pago: boolean;
    unitFromReleaseSSWId: number;
    userId: number;
    eventReleaseSSWId: number;
}