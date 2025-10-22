import React, { useState } from 'react';
import { InputField, TextareaField, Repeater, SaveBar } from './CmsComponents';
import { useToast } from '../../hooks/useToast';

const AboutUsEditor = () => {
    const { addToast } = useToast();
    const [timelineItems, setTimelineItems] = useState([
        { id: 1, year: '2022', description: 'The Idea was born.' },
        { id: 2, year: '2023', description: 'App Launch' }
    ]);

    return (
        <div className="p-6 space-y-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">About Us Page Content</h3>
                <div className="space-y-4">
                <InputField label="Page Title" value="About Find Sukoon" onChange={() => {}} />
                <TextareaField label="Mission Text" value="Our mission is to make language learning personal..." onChange={() => {}} />
                <TextareaField label="Vision Text" value="To become India’s #1 platform..." onChange={() => {}} />
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Timeline</h3>
                <Repeater 
                    items={timelineItems} 
                    onItemsChange={setTimelineItems} 
                    newItem={{ year: '', description: '' }} 
                    renderItem={(item, onChange) => (
                        <div className="space-y-2">
                            <InputField label="Year" value={item.year} onChange={val => onChange('year', val)} />
                            <InputField label="Description" value={item.description} onChange={val => onChange('description', val)} />
                        </div>
                    )} 
                />
            </div>
            <SaveBar onSave={() => addToast('Saved draft!', 'info')} onPublish={() => addToast('Published!', 'success')} />
        </div>
    );
};
export default AboutUsEditor;
