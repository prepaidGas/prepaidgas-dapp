import { Card, Title, Text, Button, Divider, List, ListItem } from "@tremor/react"
import { useState, useEffect } from "react"

export default function Footer() {
  return (
    <div className="flex flex-col w-full h-auto self-end">
      <Divider />
      <div className="w-full h-auto flex flex-row justify-evenly">
        <div className="flex flex-col">
          <Title>Title 1</Title>
          <List>
            <ListItem>Link 1</ListItem>
            <ListItem>Link 2</ListItem>
            <ListItem>Link 3</ListItem>
            <ListItem>Link 4</ListItem>
            <ListItem>Link 5</ListItem>
          </List>
        </div>
        <div className="flex flex-col">
          <Title>Title 2</Title>
          <List>
            <ListItem>Link 1</ListItem>
            <ListItem>Link 2</ListItem>
            <ListItem>Link 3</ListItem>
            <ListItem>Link 4</ListItem>
            <ListItem>Link 5</ListItem>
          </List>
        </div>
        <div className="flex flex-col">
          <Title>Title 3</Title>
          <List>
            <ListItem>Link 1</ListItem>
            <ListItem>Link 2</ListItem>
            <ListItem>Link 3</ListItem>
            <ListItem>Link 4</ListItem>
            <ListItem>Link 5</ListItem>
          </List>
        </div>
      </div>
    </div>
  )
}
