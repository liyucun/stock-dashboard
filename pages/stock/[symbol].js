import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import AccessDeny from '@/components/accessDeny'
import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Button, Input } from '@geist-ui/core'
import Navbar from '@/components/navbar'
import axios from 'axios'

export default function Stock() {
    const { data: session } = useSession()

    if (!session) {
        return <AccessDeny />
    }

    return (
        <div>
            <Navbar />
            <StockDiagram />
            <Admin />
        </div>
    )

}

const StockDiagram = () => {
    const router = useRouter()
    const [historyData, setHistoryData] = useState([])
    const [realtimeData, setRealTimeData] = useState([])
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    const diagramData = [...historyData, ...realtimeData]
    const diagramOption = {
        tooltip: {
            trigger: 'axis'
        },
        dataZoom: [
            {
                type: 'slider',
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: diagramData.map(record => record.datetime)
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
            }
        ],
        series: [
            {
                name: 'Current Price',
                type: 'line',
                data: diagramData.map(record => record.price)
            }
        ]
    };


    useEffect(() => {
        const fetchData = async (symbol) => {
            try {
                const { data: response } = await axios.get(process.env.NEXT_PUBLIC_HISTORY_DATA_API + symbol);
                setHistoryData(response);
            } catch (error) {
                console.error(error.message);
            }
        }

        if (router.query.symbol) {
            fetchData(router.query.symbol);
        }
    }, []);

    useEffect(() => {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
            setSocket(ws);
            setConnected(true);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.symbol === router.query.symbol) {
                setRealTimeData((prev) => ([...prev, data]))
            }
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

    return <ReactECharts
        option={diagramOption}
        style={{ height: 400, marginLeft: 100, marginRight: 100 }}
    />;
};

function Admin() {
    const router = useRouter()
    const [targetPrice, setTargetPrice] = useState("");

    const sumbit = () => {
        const modifyStockPrice = async (symbol) => {
            try {
                await axios.post(process.env.NEXT_PUBLIC_SET_LATEST_PRICE_API + symbol, {
                    price: Number.parseFloat(targetPrice)
                });
                alert(`Updated stock price ${router.query.symbol}:${targetPrice}`)
            } catch (error) {
                console.error(error.message);
            }
        }

        if (router.query.symbol) {
            modifyStockPrice(router.query.symbol);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="mx-8 mt-6 flex justify-center">
                <Input placeholder="eg: 10.55" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} />
            </div>

            <div className="mx-8 mt-6 flex justify-center">
                <Button auto type="success" onClick={sumbit}>Submit</Button>
            </div>

        </div>
    )
}