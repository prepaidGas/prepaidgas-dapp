"use client"

import format from "date-fns/format"

import { CalendarDaysIcon, ClockIcon, FireIcon } from "@heroicons/react/24/outline"
import {
  Card,
  Text,
  TextInput,
  NumberInput,
  DateRangePicker,
  DateRangePickerItem,
  DatePicker,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Flex,
  Icon,
  Select,
  SelectItem,
  Button,
} from "@tremor/react"

export default function CreateOrderCard() {
  return (
    <Card className="mt-6 flex flex-col w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col justify-between">
          <Text>Gas</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={FireIcon}></Icon>
            <NumberInput placeholder="Amount of gas to buy"></NumberInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period Start</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={CalendarDaysIcon}></Icon>

            <DatePicker placeholder={format(new Date(), "MMM d, y")} />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput placeholder="00:00"></TextInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period End</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={CalendarDaysIcon}></Icon>
            <DatePicker placeholder={format(new Date(), "MMM d, y")} />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput placeholder="00:00"></TextInput>
          </div>
        </div>
      </div>
      <Accordion className="mt-4 overflow-visible">
        <AccordionHeader>Advanced Settings</AccordionHeader>
        <AccordionBody className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col justify-between">
              <Text>Gas</Text>
              <div className="flex flex-row mt-2">
                <Icon icon={FireIcon}></Icon>
                <NumberInput placeholder="Amount of gas to buy"></NumberInput>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Text>Execution period Start</Text>
              <div className="flex flex-row mt-2">
                <Icon icon={CalendarDaysIcon}></Icon>
                <DatePicker />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Text>Execution period End</Text>
              <div className="flex flex-row mt-2">
                <Icon icon={CalendarDaysIcon}></Icon>
                <DatePicker />
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
      <div className="flex flex-row justify-end mt-4">
        <Button>Create</Button>
      </div>
    </Card>
  )
}
