/** Client-side filter for trade lists (active / completed) */
export function getTradeTypeCounts(trades) {
  const buy = trades.filter((t) => t.type === 'BUY').length;
  const sell = trades.filter((t) => t.type === 'SELL').length;
  return { ALL: trades.length, BUY: buy, SELL: sell };
}

export function filterTrades(trades, query, typeFilter = 'ALL') {
  let list = trades;
  if (typeFilter === 'BUY' || typeFilter === 'SELL') {
    list = list.filter((t) => t.type === typeFilter);
  }

  const q = query.trim().toLowerCase();
  if (!q) return list;

  return list.filter((trade) => {
    const symbol = trade.asset?.symbol?.toLowerCase() ?? '';
    const type = trade.type?.toLowerCase() ?? '';
    const status = trade.status?.toLowerCase() ?? '';
    const closeReason = trade.closeReason?.toLowerCase() ?? '';
    const pip = String(trade.pip ?? '');
    const packages = (trade.packages ?? [])
      .map((p) => (typeof p === 'object' ? p.name : ''))
      .join(' ')
      .toLowerCase();
    const creator = trade.creator?.creatorName?.toLowerCase() ?? '';

    return (
      symbol.includes(q) ||
      type.includes(q) ||
      status.includes(q) ||
      closeReason.includes(q) ||
      pip.includes(q) ||
      packages.includes(q) ||
      creator.includes(q)
    );
  });
}
