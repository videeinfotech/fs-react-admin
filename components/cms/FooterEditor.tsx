import React from 'react';
import { InputField, Repeater, SaveBar } from './CmsComponents';
import { useToast } from '../../hooks/useToast';

const FooterEditor = () => {
    const { addToast } = useToast();
    return (
        <div className="p-6 space-y-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Footer Content</h3>
                <div className="space-y-4">
                    <InputField label="Copyright Text" value={`© ${new Date().getFullYear()} Find Sukoon. All rights reserved.`} onChange={() => {}} />
                    <InputField label="Support Email" value="support@findsukoon.com" onChange={() => {}} />
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <Repeater items={[{id: 1, name: 'About', url: '/about'}, {id: 2, name: 'Careers', url: '/careers'}]} onItemsChange={() => {}} newItem={{name: '', url: ''}} renderItem={(item, onChange) => (
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Link Name" value={item.name} onChange={val => onChange('name', val)} />
                    <InputField label="URL" value={item.url} onChange={val => onChange('url', val)} />
                </div>
              )} />
            </div>
             <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Social Links</h3>
              <Repeater items={[{id: 1, platform: 'Facebook', url: '#'}, {id: 2, platform: 'Instagram', url: '#'}]} onItemsChange={() => {}} newItem={{platform: '', url: ''}} renderItem={(item, onChange) => (
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Platform" value={item.platform} onChange={val => onChange('platform', val)} />
                    <InputField label="URL" value={item.url} onChange={val => onChange('url', val)} />
                </div>
              )} />
            </div>
            <SaveBar onSave={() => addToast('Saved draft!', 'info')} onPublish={() => addToast('Published!', 'success')} />
        </div>
    );
};
export default FooterEditor;
