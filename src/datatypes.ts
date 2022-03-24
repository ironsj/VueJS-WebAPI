type Token = {
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    image: string;
    price_change_percentage_24h: number;
  };

type Companies = {
    name: string;
    symbol: string;
    country: string;
    total_holdings: number;
    total_entry_value_usd: number;
    total_current_value_usd: number;
};

type CompanyHoldings = {
    companies: Array<Companies>
};
  
  
export { Token, Companies, CompanyHoldings };