export function warnOnce(zone: string) {
  const didWarn: { [msg: string]: boolean } = {};

  return (message: string) => {
    if (!didWarn[message]) {
      console.error(`TXUI/${zone} ${message}`);
      didWarn[message] = true;
    }
  };
}
