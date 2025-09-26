import React from "react"
import type CardVeiculoType from "../model/types"

interface CardVeiculoProps {
    props: CardVeiculoType;
}

export const CardVeiculo: React.FC<CardVeiculoProps> = ({props}: CardVeiculoProps) => {
    return (
        <div className="grid w-60 border-amber-400 border-2 rounded-2xl gap-2 p-3">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Veículo {props.cod_veiculo}</h2>
                    <p className="text-sm ">Motivo: {props.status}</p>
                    <h4 className="text-sm ">Motorista: {props.status}</h4>
                    <h4 className="text-sm ">Local: {props.status}</h4>
                </div>
                <div className="text-sm text-gray-500">
                    Timer: {props.id}
                </div>
            </div>
            <div className="flex justify-center">
                <button className="mt-5 w-50 justify-center-safe bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Ver detalhes
                </button>
            </div>
        </div>
    )
}