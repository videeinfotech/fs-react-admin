import React from 'react';

export const AVATAR_LIST = [
    'https://i.pravatar.cc/150?u=1',
    'https://i.pravatar.cc/150?u=2',
    'https://i.pravatar.cc/150?u=3',
    'https://i.pravatar.cc/150?u=4',
    'https://i.pravatar.cc/150?u=5',
    'https://i.pravatar.cc/150?u=6',
    'https://i.pravatar.cc/150?u=7',
    'https://i.pravatar.cc/150?u=8',
];

interface AvatarPickerProps {
    selectedAvatar: string;
    onSelectAvatar: (url: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, onSelectAvatar }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select an Avatar</label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {AVATAR_LIST.map(url => (
                    <button
                        key={url}
                        type="button"
                        onClick={() => onSelectAvatar(url)}
                        className={`rounded-full overflow-hidden border-4 transition-all duration-200 ${selectedAvatar === url ? 'border-primary-500 scale-110' : 'border-transparent hover:border-primary-300'}`}
                    >
                        <img src={url} alt="Avatar" className="w-16 h-16 object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};
