import { ReactNode, useState } from "react"
import { Button, ButtonProps } from "antd"

type PropsWithChildren<P> = P & { children?: ReactNode }

function Buttons(props: PropsWithChildren<ButtonProps>) {
  const { children, ...rest } = props
  return <Button {...rest}>{children}</Button>
}

function BtnGroup({ children }: any) {
  return <Button.Group>{children}</Button.Group>
}

export { Buttons, BtnGroup }
