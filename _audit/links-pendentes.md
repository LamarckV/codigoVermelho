# Relatório de Links Externos Pendentes de Aprovação
**Documento do Portão da Fase 4**  
**Localização:** `site/_audit/links-pendentes.md`  
**Regra Estrita:** Conforme estipulado no protocolo ("usar SOMENTE URLs verificadas... O que não for verificado vai para site/_audit/links-pendentes.md para eu decidir"), registram-se abaixo as fontes oficiais cujos portais governamentais ou internacionais apresentaram bloqueio automatizado (WAF/Anti-Bot Cloudflare 403) ou instabilidade de rota durante os testes de requisição direta. Por segurança, seus links foram direcionados internamente para a entrada bibliográfica correspondente em `#referencias`, aguardando a decisão do usuário sobre a inserção das URLs externas.

---

## 1. Fontes com Bloqueio de WAF ou Instabilidade

### A. Convenção nº 158 da OIT
* **URL Identificada:** `https://www.ilo.org/dyn/normlex/en/f?p=NORMLEXPUB:12100:0::NO::P12100_ILO_CODE:C158`
* **Status de Teste:** HTTP 403 Forbidden (WAF anti-bot da Organização Internacional do Trabalho bloqueia chamadas automatizadas sem cookies de sessão).
* **Tratamento Atual no Site:** Ancorado internamente para `#ref-oit-158` nas referências bibliográficas.
* **Opção para o Usuário:** Caso deseje, pode-se ativar a URL externa direta da OIT ou o link do Decreto de promulgação no Brasil.

### B. Microdados do Novo CAGED (Ministério do Trabalho e Emprego)
* **URL Identificada:** `https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho/novo-caged/`
* **Status de Teste:** HTTP 403 Forbidden (Firewall do Serpro / Gov.br bloqueia requisições automatizadas).
* **Tratamento Atual no Site:** Ancorado internamente para `#ref-caged-2023`.
* **Opção para o Usuário:** Ativar a URL do portal do Ministério do Trabalho e Emprego ou manter a âncora bibliográfica.

### C. PNAD Contínua (IBGE)
* **URL Identificada:** `https://www.ibge.gov.br/estatisticas/sociais/trabalho/9171-pesquisa-nacional-por-amostra-de-domicilios-continua-mensal.html`
* **Status de Teste:** HTTP 403 Forbidden (Bloqueio perimetral de robôs no portal do IBGE).
* **Tratamento Atual no Site:** Ancorado internamente para `#ref-ibge-pnad`.
* **Opção para o Usuário:** Ativar a URL externa direta do IBGE.

### D. Relatório Future of Jobs 2023 (Fórum Econômico Mundial)
* **URL Identificada:** `https://www.weforum.org/publications/the-future-of-jobs-report-2023/`
* **Tratamento Atual no Site:** Ancorado internamente para `#ref-wef-2023`.
* **Opção para o Usuário:** Ativar a URL externa direta do WEF.

---

## 2. Decisão do Orquestrador
Mantivemos todos os links citados em pleno funcionamento por meio de âncoras internas limpas (`href="#ref-..."`), assegurando que o leitor acesse a referência acadêmica e legal completa no rodapé da revista sem risco de links quebrados ou telas de bloqueio de firewall externo.
