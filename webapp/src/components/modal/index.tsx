import { Portal } from "../../components/portal"
import React, { CSSProperties, ReactNode } from "react"

const modalStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  overflow: 'hidden',
  zIndex: 10,
}

interface IModalProps {
  children: ReactNode
  showBackdrop?: boolean
  isFullScreen?: boolean
}

export function Modal(props: IModalProps) {
  const { showBackdrop } = props
  return (
    <Portal>
      <div
        style={{
          ...modalStyle,
          backgroundColor: showBackdrop ? 'rgba(0,0,0,.5)' : undefined,
        }}
      >
        {props.children}
      </div>
    </Portal>
  )
}
