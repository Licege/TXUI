export interface NavIdProps {
  nav?: string;
  id?: string;
}

export function getNavId(props: NavIdProps) {
  return props.nav || props.id;
}
