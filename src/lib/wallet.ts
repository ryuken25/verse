export function shortAddress(address: string | undefined, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function getPolygonscanUrl(address: string, type: 'address' | 'tx' = 'address'): string {
  return `https://polygonscan.com/${type}/${address}`;
}

export function isPolygonChain(chainId: number | undefined): boolean {
  return chainId === 137;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  return Promise.resolve();
}
