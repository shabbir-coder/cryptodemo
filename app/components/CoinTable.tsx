interface CoinTableProps {
    data: Array<{
        symbol: string;
        price: number;
        priceChange: number;
        timestamp: string;
    }>;
}

const CoinTable = ({ data }: CoinTableProps) => {
    return (
    <div className="container mx-auto my-5 p-4 bg-white shadow rounded">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Change %</th>
            <th className="py-2 px-4 border-b">Updated At</th>
          </tr>
        </thead>
        <tbody>
            {data.length ?
            ( data?.map((entry, index)=>(
                <tr key={index}>
                    <td className="py-2 px-4 border-b">{entry.price.toFixed(5)}</td>
                    <td className="py-2 px-4 border-b">{entry.priceChange.toFixed(3)} %</td>
                    <td className="py-2 px-4 border-b">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
            ))):
                (
                    <tr>
                        <td className="py-2 px-4 border-b" colSpan={3}>No data found</td>
                    </tr>
                )
            }
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
