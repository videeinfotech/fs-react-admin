import React from 'react';
import { mockTransactions } from '../Wallet';

const TransactionItem: React.FC<{ transaction: typeof mockTransactions[0] }> = ({ transaction }) => (
    <div className="flex justify-between items-center py-4 border-b dark:border-gray-700">
        <div>
            <p className="font-semibold text-gray-900 dark:text-white">{transaction.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
        </div>
        <div className={`font-bold text-lg ${transaction.type === 'Credit' ? 'text-green-500' : 'text-red-500'}`}>
            {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
        </div>
    </div>
);

const Wallet: React.FC = () => {
    const currentBalance = 5250.50; // Mock balance

    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">My Wallet</h1>
            </header>

            {/* Balance Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
                <p className="text-4xl font-bold my-2 text-primary-600">₹{currentBalance.toFixed(2)}</p>
                <button className="mt-4 w-full sm:w-auto px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700">
                    Recharge Wallet
                </button>
            </div>

            {/* Transaction History */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    {mockTransactions.slice(0, 5).map(tx => (
                        <TransactionItem key={tx.id} transaction={tx} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Wallet;
