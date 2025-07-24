import { Leaf } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="flex flex-col items-center">
        <Leaf className="w-16 h-16 text-nature-600 animate-spin mb-4" />
        <span className="text-2xl font-bold text-nature-800">YeşilRulo</span>
      </div>
    </div>
  );
}
