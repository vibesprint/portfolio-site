export function ErrorText({ text, ...args }) {
  return (
    <p className="font-body-primary text-raspberry-800" {...args}>
      {text}
    </p>
  );
}

export function NeutralText({ text, ...args }) {
  return (
    <p className="font-body-primary text-grey-500" {...args}>
      {text}
    </p>
  );
}
