import React from "react";

type Props = {
  rightElement?: React.ReactNode;
  leftElement: React.ReactNode;
  title: string;
};

export default function PageNavControl({
  title,
  rightElement,
  leftElement,
}: Props) {
  return (
    <header className="absolute left-0 top-0 flex h-[50px] w-full items-center justify-center bg-white md:hidden">
      {leftElement}
      <h3 className="font-semibold">{title}</h3>
      {rightElement}
    </header>
  );
}
