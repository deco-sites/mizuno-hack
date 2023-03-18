import { useSignal } from "@preact/signals";

type Props = {
  Trigger: preact.ComponentChildren;
  children: preact.ComponentChildren;
};

export default function Dropdown({ Trigger, children }: Props) {
  const open = useSignal(true);

  return (
    <>
      <button type="button" onClick={() => open.value = !open.value}>
        {Trigger}
      </button>
      {open.value ? children : null}
    </>
  );
}
