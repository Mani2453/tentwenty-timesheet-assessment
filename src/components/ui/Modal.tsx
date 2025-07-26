import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center justify-center inset-0 z-50  w-[1440px]  overflow-y-auto">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50" onClick={onClose} />
        <div className={`relative bg-white rounded-lg shadow-xl w-[646px] h-[660px]`}>
          <div className="flex items-center justify-between h-[67px] p-5 border-b border-gray-200">
            <h3 className="text-[18px] font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="">
            {children}
          </div>
        </div>
    </div>
  );
};