import React from 'react';

// InputField
export const InputField: React.FC<{ label: string, value: string, onChange: (value: string) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
    </div>
);

// TextareaField
export const TextareaField: React.FC<{ label: string, value: string, onChange: (value: string) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
    </div>
);

// ImageUpload
export const ImageUpload: React.FC<{ label: string }> = ({ label }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400"><p className="pl-1">Upload a file or drag and drop</p></div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
    </div>
);

// Repeater
interface RepeaterItem { id: number | string; [key: string]: any; }
export const Repeater: React.FC<{
    items: RepeaterItem[];
    onItemsChange: (items: any[]) => void;
    renderItem: (item: any, onChange: (field: string, value: any) => void) => React.ReactNode;
    newItem: object;
}> = ({ items, onItemsChange, renderItem, newItem }) => {
    
    const handleItemChange = (id: number | string, field: string, value: any) => {
        const newItems = items.map(i => i.id === id ? { ...i, [field]: value } : i);
        onItemsChange(newItems);
    };

    const addItem = () => {
        onItemsChange([...items, { ...newItem, id: Date.now() }]);
    };

    const removeItem = (id: number | string) => {
        onItemsChange(items.filter(i => i.id !== id));
    };

    return (
        <div className="space-y-4">
            {items.map(item => (
                <div key={item.id} className="p-4 border dark:border-gray-600 rounded-md relative">
                    <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-red-500 font-bold">&times;</button>
                    {renderItem(item, (field, value) => handleItemChange(item.id, field, value))}
                </div>
            ))}
            <button type="button" onClick={addItem} className="px-3 py-1 text-sm border-dashed border-2 rounded-md hover:border-primary-500 hover:text-primary-500">
                + Add Item
            </button>
        </div>
    );
};

// ToggleSwitch
export const ToggleSwitch: React.FC<{ label: string, enabled: boolean, setEnabled: (e: boolean) => void }> = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <button type="button" onClick={() => setEnabled(!enabled)} className={`${enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 items-center rounded-full`}>
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
        </button>
    </div>
);

// SaveBar
export const SaveBar: React.FC<{ onSave: () => void; onPublish: () => void }> = ({ onSave, onPublish }) => (
    <div className="sticky bottom-0 mt-8 py-4 bg-gray-100 dark:bg-gray-900 flex justify-end space-x-3 border-t-2 border-gray-200 dark:border-gray-700 -mx-6 px-6 rounded-b-lg">
        <button onClick={onSave} type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
            Save Draft
        </button>
        <button onClick={onPublish} type="submit" className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700">
            Publish
        </button>
    </div>
);
