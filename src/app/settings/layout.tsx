import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return <div>{children}</div>;
}
