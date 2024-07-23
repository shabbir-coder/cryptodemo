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
            <th className="py-2 px-1 border-b text-table">Price</th>
            <th className="py-2 px-1 border-b text-table">Change %</th>
            <th className="py-2 px-1 border-b text-table">Updated At</th>
          </tr>
        </thead>
        <tbody>
            {data.length ?
            ( data?.map((entry, index)=>(
                <tr key={index}>
                    <td className="py-2 px-1 border-b text-table">{entry.price}</td>
                    <td className="py-2 px-1 border-b text-table">{entry.priceChange.toFixed(3)} %</td>
                    <td className="py-2 px-1 border-b text-time">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
            ))):
                (
                    <tr>
                        <td className="py-2 px-1 border-b" colSpan={3}>No data found</td>
                    </tr>
                )
            }
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
