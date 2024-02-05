import { DocumentTextIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { Callout, Text, Icon } from "@tremor/react"

export default function Tooltip({
  tooltipText,
  iconSize,
}: {
  tooltipText: string
  iconSize: "xs" | "sm" | "md" | "lg" | "xl"
}) {
  return <Icon icon={QuestionMarkCircleIcon} tooltip={tooltipText} size={iconSize}></Icon>
}
