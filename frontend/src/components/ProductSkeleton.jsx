import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-[2rem] p-4 border border-gray-100 flex flex-col h-full animate-pulse">
            <div className="relative w-full h-48 rounded-2xl mb-4 bg-gray-200"></div>
            <div className="px-2 flex flex-col flex-1">
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex items-center gap-1 mb-4">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="mt-auto flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="w-full mt-4 bg-gray-100 py-3 rounded-xl h-12"></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
