import { Button, Grid, Col, Card } from "@tremor/react";
import Link from 'next/link';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default async function OrderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="p-8 max-w-screen-lg mx-auto">
            <Grid numItems={2} className="gap-2 mb-6">
                <Col>
                    <Card className="space-x-2">
                        <Link href="/order/create">
                            {/* @todo add icons */}
                            <Button>Create Order</Button>
                        </Link>
                        <Link href="/order/search">
                            <Button>Search</Button>
                        </Link>
                        <Link href="/order/saved">
                            <Button>Saved</Button>
                        </Link>
                        <Link href="/order/myorders">
                            <Button>My Orders</Button>
                        </Link>
                    </Card>
                </Col>
            </Grid>
            {children}
        </main>
    )
}