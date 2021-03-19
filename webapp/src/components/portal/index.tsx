import React from "react"
import { createPortal } from "react-dom"

interface IPortalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export function Portal(props: IPortalProps) {
  const modalRoot = document.getElementById("portal-root")
  if (!modalRoot) {
    throw new Error('cannot find portal-root')
  }
  return createPortal(props.children, modalRoot)
}
