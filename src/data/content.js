// Conteúdo centralizado. Todos os números são FICTÍCIOS e servem apenas para demonstração.

export const NAV = [
  { label: 'Para você', href: '#produtos' },
  { label: 'Para empresas', href: '#diferenciais' },
  { label: 'Investimentos', href: '#investimentos' },
  { label: 'Cartões', href: '#cartoes' },
  { label: 'Sobre nós', href: '#sobre' },
]

export const TICKER = [
  'Conta digital gratuita',
  'Pix ilimitado',
  'Cashback em compras',
  'Conta Global em dólar',
  'Investimentos a partir de R$ 1',
  'Cartão sem anuidade',
  'Super app completo',
  'Suporte 24/7',
]

export const PORTFOLIO = {
  '1M': [100, 101.2, 100.8, 102.1, 103.4, 102.9, 104.2, 105.1, 104.6, 106.3, 107.0, 106.4, 108.2],
  '6M': [100, 98.4, 101.6, 104.8, 103.2, 107.9, 110.4, 109.1, 113.6, 116.2, 114.8, 118.9, 121.4],
  '1A': [100, 103.5, 99.2, 106.1, 111.4, 108.7, 115.2, 121.8, 118.3, 126.5, 131.9, 129.4, 137.8],
  '5A': [100, 112, 108, 131, 126, 149, 168, 159, 192, 214, 206, 241, 268],
}

export const ALLOCATION = [
  { label: 'Renda fixa', value: 42, color: '#FF7A00' },
  { label: 'Ações', value: 26, color: '#FFA95C' },
  { label: 'Fundos', value: 18, color: '#FFE4CC' },
  { label: 'Internacional', value: 14, color: '#6E6E76' },
]

export const ASSETS = [
  { code: 'CDB-X', name: 'CDB Liquidez Diária', yield: '+1,02%', up: true, spark: [3, 4, 4, 5, 5, 6, 7, 7, 8] },
  { code: 'TSY-28', name: 'Tesouro Prefixado', yield: '+0,94%', up: true, spark: [4, 4, 5, 4, 6, 6, 7, 6, 8] },
  { code: 'ETF-GL', name: 'ETF Global Tech', yield: '+3,81%', up: true, spark: [2, 3, 5, 4, 6, 5, 8, 7, 9] },
  { code: 'FII-LG', name: 'FII Logística', yield: '−0,37%', up: false, spark: [7, 6, 7, 5, 6, 5, 4, 5, 4] },
]

export const CARDS = [
  {
    id: 'orange',
    name: 'Inter Gold',
    tagline: 'O clássico laranja, sem anuidade.',
    perks: ['Zero anuidade', 'Cashback em compras', 'Cartão virtual instantâneo'],
  },
  {
    id: 'platinum',
    name: 'Inter Platinum',
    tagline: 'Mais benefícios para o seu dia a dia.',
    perks: ['Seguros de viagem', 'Proteção de preço', 'Cashback ampliado'],
  },
  {
    id: 'black',
    name: 'Inter Black',
    tagline: 'Exclusividade em cada detalhe.',
    perks: ['Salas VIP em aeroportos', 'Concierge 24h', 'Pontos que não expiram'],
  },
  {
    id: 'win',
    name: 'Inter Win',
    tagline: 'Para quem joga em outro nível.',
    perks: ['Atendimento private', 'Experiências exclusivas', 'Limites personalizados'],
  },
]

export const FEATURES = [
  {
    n: '01',
    title: 'Banco digital completo',
    text: 'Conta, cartão, investimentos, seguros e crédito em um único app. Tudo o que um banco faz — sem filas, sem papel e sem agências.',
  },
  {
    n: '02',
    title: 'Gestão financeira simplificada',
    text: 'Categorias automáticas, metas inteligentes e insights que transformam extratos em decisões claras.',
  },
  {
    n: '03',
    title: 'Soluções internacionais',
    text: 'Conta em dólar, cartão global e câmbio transparente para comprar, viajar e investir lá fora.',
  },
  {
    n: '04',
    title: 'Experiência integrada',
    text: 'Banco, shopping, viagens e serviços conectados. Cada compra no Super App volta como cashback na sua conta.',
  },
  {
    n: '05',
    title: 'Tecnologia e inovação',
    text: 'Infraestrutura em nuvem, segurança em camadas e novas funcionalidades entregues toda semana.',
  },
]

export const FOOTER_LINKS = [
  {
    title: 'Produtos',
    links: ['Conta digital', 'Cartões', 'Investimentos', 'Empréstimos', 'Inter Shop', 'Conta Global'],
  },
  {
    title: 'Para empresas',
    links: ['Conta PJ', 'Maquininha', 'Folha de pagamento', 'Crédito empresarial', 'API Banking'],
  },
  {
    title: 'Institucional',
    links: ['Sobre nós', 'Carreiras', 'Imprensa', 'Sustentabilidade', 'Relações com investidores'],
  },
  {
    title: 'Ajuda',
    links: ['Central de ajuda', 'Segurança', 'Privacidade', 'Termos de uso', 'Ouvidoria'],
  },
]
