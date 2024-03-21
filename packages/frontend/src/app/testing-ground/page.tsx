"use client"

import TruncatedTextWithTooltip from "@/components/TruncatedTextWithTooltip"
import { Title, Text, Card } from "@tremor/react"
import App from "@/pages_dashboard/_app"

export default function TestingGround() {
  const longStr = "Lorem ipsum dolor sit amet consectetur adipisicing elit."
  const walletAddress = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"

  return (
    <App />
    // <div>
    //   <Title>Testing ground for features and components</Title>
    //   <div className="flex flex-col gap-4 mt-4">
    //     <Card>
    //       <Title>Text truncate</Title>
    //       <div className="mt-4 flex flex-col">
    //         <div className="flex flex-row gap-2">
    //           <Text>Truncated string with a tooltip: </Text>
    //           <TruncatedTextWithTooltip text={longStr} />
    //         </div>
    //       </div>
    //       <div className="mt-4 flex flex-col">
    //         <div className="flex flex-row gap-2">
    //           <Text>Truncated string with a tooltip and copy on click: </Text>
    //           <TruncatedTextWithTooltip text={walletAddress} isCopyable />
    //         </div>
    //       </div>
    //     </Card>
    //   </div>
    // </div>
  )
}
