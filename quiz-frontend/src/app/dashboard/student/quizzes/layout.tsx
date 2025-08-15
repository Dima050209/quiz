import React, { ReactNode } from "react";

export default function QuizLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div>
      {modal}
      {children}
    </div>
  );
}
