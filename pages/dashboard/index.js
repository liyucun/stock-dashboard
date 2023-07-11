import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar'
import AccessDeny from '@/components/accessDeny'
import { Table, Button } from '@geist-ui/core'
import Image from 'next/image'

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) {
    return <AccessDeny />
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="mx-8 mt-6 flex justify-center">
        <StockTable />
      </div>

      <div className="mx-8 mt-6 pb-10 flex justify-center">
        <Image src="/architecture.png" width="600" height="600"/>
      </div>
    </div>
  )
}

function StockTable() {
  const router = useRouter();

  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  const [stockData, setStockData] = useState({
    "AMD": "-",
    "AAPL": "-",
    "MSFT": "-",
    "AC": "-",
    "TSLA": "-",
    "TSM": "-",
    "V": "-",
  })

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setSocket(ws);
      setConnected(true);
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      const data = JSON.parse(event.data);
      setStockData((prev) => ({
        ...prev,
        [data.symbol]: data.price,
      }));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
      setConnected(false);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const renderAction = (value, rowData, rowIndex) => {
    return (
      <Button type="secondary" auto scale={1 / 3} font="12px" onClick={() => router.push(`/stock/${rowData.name}`)}>View</Button>
    )
  }

  const tableDisplayData = Object.keys(stockData).map(symbol => ({
    name: symbol,
    price: stockData[symbol],
    operation: ''
  }))

  return (
    <Table data={tableDisplayData} width={40}>
      <Table.Column prop="name" label="Name" />
      <Table.Column prop="price" label="price" />
      <Table.Column prop="operation" label="operation" width={15} render={renderAction} />
    </Table>
  )
}

