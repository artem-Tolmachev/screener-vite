export function extractTokenSymbol(symbol) {
    const match = symbol.match(/^(\d*)([A-Z]+)$/);
    const [, digits, rest] = match || [];
    const cleanPrefix = digits && digits.length > 3 ? '' : digits || '';
    const cleaned = cleanPrefix + rest;
    const suffixes = ['USDT', 'USDC', 'PERP', 'BUSD', 'ETH', 'BTC'];
    for (const suffix of suffixes) {
        if (cleaned.endsWith(suffix)) {
            return cleaned.slice(0, -suffix.length);
        }
    }
    return cleaned;
}
