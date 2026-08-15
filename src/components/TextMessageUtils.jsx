export function ErrorText({ text, additionalTextStyle, ...args }) {
  const default_styles = ["font-body-primary", "text-raspberry-800"];
  const all_styles = [...default_styles, ...(additionalTextStyle ?? [])];
  return (
    <p className={all_styles.join(" ")} {...args}>
      {text}
    </p>
  );
}

export function NeutralText({ text, additionalTextStyle, ...args }) {
  const default_styles = ["font-body-primary", "text-grey-500"];
  const all_styles = [...default_styles, ...(additionalTextStyle ?? [])];
  return (
    <p className={all_styles.join(" ")} {...args}>
      {text}
    </p>
  );
}
