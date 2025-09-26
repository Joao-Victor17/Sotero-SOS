import { useEffect, useState } from "react";
import type { Setor, Veiculo } from "@/entities";
import type { MotoristaExpandido } from "../model/types";
import { carregarBasicos, carregarLista } from "../api/carregarLista";
import { onSubmit } from "../api/onSubmit";

export default function FormMotorista() {
	const [matricula, setMatricula] = useState<number | "">("");
	const [nome, setNome] = useState("");
	const [setores, setSetores] = useState<Setor[]>([]);
	const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
	const [setorId, setSetorId] = useState<number | "">("");
	const [carregando, setCarregando] = useState(false);
	const [statusMsg, setStatusMsg] = useState<string | null>(null);

	const [lista, setLista] = useState<MotoristaExpandido[]>([]);
	const [carregandoLista, setCarregandoLista] = useState(false);

	useEffect(() => {
		(async () => {
			await carregarBasicos({ setSetores, setVeiculos });
		})();
	}, []);

	// Recarrega lista quando setores/veículos carregarem
	useEffect(() => {
		if (setores.length >= 0 && veiculos.length >= 0) {
			carregarLista({
				setLista,
				setStatusMsg,
				setCarregandoLista,
				setores,
				veiculos,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setores, veiculos]);

	return (
		<div className="card">
			<h2>Adicionar Motorista</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setCarregando(true);
					setStatusMsg(null);
					onSubmit({
						e,
						matricula,
						nome,
						setorId,
						setStatusMsg,
						setCarregando,
						setMatricula,
						setNome,
						setSetorId,
						setLista,
						setCarregandoLista,
						setores,
						veiculos,
					});
				}}
			>
				<label>
					Matrícula
					<input
						type="number"
						value={matricula}
						onChange={(e) =>
							setMatricula(
								e.target.value === ""
									? ""
									: Number(e.target.value)
							)
						}
						placeholder="Ex.: 5678"
						required
					/>
				</label>
				<label>
					Nome
					<input
						type="text"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						placeholder="Ex.: João da Silva"
						required
					/>
				</label>
				<label>
					Setor
					<select
						value={setorId}
						onChange={(e) =>
							setSetorId(
								e.target.value === ""
									? ""
									: Number(e.target.value)
							)
						}
						required
					>
						<option value="">Selecione um setor</option>
						{setores.map((s) => (
							<option key={s.id} value={s.id}>
								{s.nome_setor} {s.turno ? `- ${s.turno}` : ""}
							</option>
						))}
					</select>
				</label>

				<button disabled={carregando} type="submit">
					{carregando ? "Salvando..." : "Adicionar"}
				</button>
				{statusMsg && <p className="status">{statusMsg}</p>}
			</form>

			<div style={{ marginTop: 24 }}>
				<h3 style={{ margin: "8px 0" }}>Motoristas cadastrados</h3>
				{carregandoLista ? (
					<p className="status">Carregando lista...</p>
				) : lista.length === 0 ? (
					<p className="status">Nenhum motorista cadastrado.</p>
				) : (
					<div className="tabela-simples">
						<div className="cabecalho">
							<span>Matrícula</span>
							<span>Nome</span>
							<span>Setor</span>
						</div>
						{lista.map((m) => (
							<div key={m.matricula} className="linha">
								<span>{m.matricula}</span>
								<span>{m.nome}</span>
								<span>{m.setor_nome || m.setor_id || "—"}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
