import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { Callout, Icon, List, ListItem, Text, Title } from "@tremor/react"
import Tooltip from "./Tooltip"

export default function Receipt({
  gasAmount,
  gasCostTokenName = "NULL",
  gasCostValue,
  rewardTokenName = "NULL",
  rewardValue,
}: {
  gasAmount: number
  gasCostTokenName?: string
  gasCostValue: number
  rewardTokenName?: string
  rewardValue: number
}) {
  return (
    <div className="relative">
      <div className="flex flex-row gap-1 items-center">
        <Title>Receipt</Title>
        <Tooltip tooltipText="This is just a placeholder" iconSize="md" />
      </div>
      <List className="flex flex-col" title="Receipt">
        {gasCostTokenName === rewardTokenName ? (
          <ListItem>
            {rewardValue + gasCostValue * gasAmount} {gasCostTokenName}
          </ListItem>
        ) : (
          <>
            <ListItem>
              {gasCostValue * gasAmount} {gasCostTokenName}
            </ListItem>
            <ListItem>
              {rewardValue} {rewardTokenName}
            </ListItem>
          </>
        )}
      </List>
    </div>
  )
}
